import Order from "../models/order.js";
import Product from "../models/product.js";
import Stripe from "stripe";
import User from "../models/user.js";

// ==========================================
// PLACE ORDER COD
// /api/order/cod
// ==========================================

export const placeOrderCod = async (req, res) => {
    try {
        const { items, address } = req.body;

        if (!address || !items || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid data",
            });
        }

        let amount = await items.reduce(async (acc, item) => {
            const productData = await Product.findById(item.product);

            if (!productData) {
                throw new Error("Product not found");
            }

            return (
                (await acc) +
                productData.offerPrice * item.quantity
            );
        }, 0);

        // 2% tax
        amount += Math.floor(amount * 0.02);

        // Create COD order
        const newOrder = await Order.create({
            userId: req.userId,
            items,
            amount,
            address,
            paymentType: "COD",
            status: "Order Placed",
            isPaid: false,
        });

        // Clear cart from database
        await User.findByIdAndUpdate(
            req.userId,
            {
                $set: {
                    cartItems: {},
                },
            }
        );

        console.log("=================================");
        console.log("✅ COD ORDER CREATED:", newOrder._id);
        console.log("🛒 COD CART CLEARED");
        console.log("=================================");

        return res.json({
            success: true,
            message: "Order Placed Successfully",
            orderId: newOrder._id,
        });

    } catch (err) {
        console.log("COD ORDER ERROR:", err.message);

        return res.json({
            success: false,
            message: err.message,
        });
    }
};


// ==========================================
// PLACE ORDER STRIPE
// /api/order/stripe
// ==========================================

export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const { origin } = req.headers;

        if (!address || !items || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid data",
            });
        }

        let productData = [];

        let amount = await items.reduce(async (acc, item) => {

            const productDataFromDB =
                await Product.findById(item.product);

            if (!productDataFromDB) {
                throw new Error("Product not found");
            }

            productData.push({
                name: productDataFromDB.name,
                price: productDataFromDB.offerPrice,
                quantity: item.quantity,
            });

            return (
                (await acc) +
                productDataFromDB.offerPrice * item.quantity
            );

        }, 0);

        // 2% tax
        amount += Math.floor(amount * 0.02);

        // Create pending order
        const newOrder = await Order.create({
            userId: req.userId,
            items,
            amount,
            address,
            paymentType: "Online",
            status: "Order Placed",
            isPaid: false,
        });

        const stripeInstance = new Stripe(
            process.env.STRIPE_SECRET_KEY
        );

        const line_items = productData.map((item) => ({
            price_data: {
                currency: "usd",

                product_data: {
                    name: item.name,
                },

                unit_amount: Math.floor(
                    item.price * 100
                ),
            },

            quantity: item.quantity,
        }));

        const session =
            await stripeInstance.checkout.sessions.create({
                line_items,
                mode: "payment",

                // IMPORTANT:
                // session_id Stripe khud replace karega
                success_url:
                    `${origin}/loader?next=my-orders&session_id={CHECKOUT_SESSION_ID}`,

                cancel_url:
                    `${origin}/cart`,

                metadata: {
                    orderId: newOrder._id.toString(),
                    userId: req.userId.toString(),
                },
            });

        console.log("=================================");
        console.log("💳 STRIPE SESSION CREATED");
        console.log("Order ID:", newOrder._id);
        console.log("Session ID:", session.id);
        console.log("=================================");

        return res.json({
            success: true,
            url: session.url,
        });

    } catch (err) {
        console.log(
            "STRIPE ORDER ERROR:",
            err.message
        );

        return res.json({
            success: false,
            message: err.message,
        });
    }
};


// ==========================================
// VERIFY STRIPE PAYMENT
// /api/order/verify-session
// ==========================================

export const verifyStripeSession = async (req, res) => {
    try {

        const { sessionId } = req.query;

        if (!sessionId) {
            return res.json({
                success: false,
                message: "Session ID missing",
            });
        }

        const stripeInstance = new Stripe(
            process.env.STRIPE_SECRET_KEY
        );

        // Get Stripe session
        const session =
            await stripeInstance.checkout.sessions.retrieve(
                sessionId
            );

        console.log("=================================");
        console.log("🔍 VERIFYING STRIPE PAYMENT");
        console.log("Session:", session.id);
        console.log(
            "Payment Status:",
            session.payment_status
        );
        console.log("=================================");

        // Payment not completed
        if (session.payment_status !== "paid") {
            return res.json({
                success: false,
                message: "Payment not completed",
            });
        }

        const {
            orderId,
            userId,
        } = session.metadata || {};

        if (!orderId || !userId) {
            return res.json({
                success: false,
                message: "Order metadata missing",
            });
        }

        // Mark order as paid
        const updatedOrder =
            await Order.findByIdAndUpdate(
                orderId,
                {
                    $set: {
                        isPaid: true,
                        status: "Order Placed",
                    },
                },
                {
                    new: true,
                }
            );

        if (!updatedOrder) {
            return res.json({
                success: false,
                message: "Order not found",
            });
        }

        // Clear cart
        const updatedUser =
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        cartItems: {},
                    },
                },
                {
                    new: true,
                }
            );

        console.log("=================================");
        console.log("✅ PAYMENT VERIFIED");
        console.log("✅ ORDER PAID:", updatedOrder._id);
        console.log(
            "🛒 CART:",
            updatedUser?.cartItems
        );
        console.log("=================================");

        return res.json({
            success: true,
            message: "Payment verified successfully",
            orderId: updatedOrder._id,
        });

    } catch (err) {

        console.log(
            "VERIFY STRIPE ERROR:",
            err.message
        );

        return res.json({
            success: false,
            message: err.message,
        });
    }
};


// ==========================================
// STRIPE WEBHOOK
// /stripe
// ==========================================

export const stripeWebhooks = async (req, res) => {

    const stripeInstance = new Stripe(
        process.env.STRIPE_SECRET_KEY
    );

    const sig =
        req.headers["stripe-signature"];

    let event;

    try {

        event =
            stripeInstance.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );

    } catch (err) {

        console.log(
            "WEBHOOK ERROR:",
            err.message
        );

        return res
            .status(400)
            .send(
                `Webhook Error: ${err.message}`
            );
    }

    try {

        switch (event.type) {

            // ======================================
            // PAYMENT SUCCESS
            // ======================================

            case "checkout.session.completed": {

                const session =
                    event.data.object;

                console.log(
                    "🔥 STRIPE WEBHOOK PAYMENT SUCCESS"
                );

                const {
                    orderId,
                    userId,
                } = session.metadata || {};

                if (!orderId || !userId) {

                    console.log(
                        "❌ Missing metadata"
                    );

                    break;
                }

                // Mark order paid
                const updatedOrder =
                    await Order.findByIdAndUpdate(
                        orderId,
                        {
                            $set: {
                                isPaid: true,
                                status: "Order Placed",
                            },
                        },
                        {
                            new: true,
                        }
                    );

                // Clear cart
                const updatedUser =
                    await User.findByIdAndUpdate(
                        userId,
                        {
                            $set: {
                                cartItems: {},
                            },
                        },
                        {
                            new: true,
                        }
                    );

                console.log(
                    "✅ WEBHOOK ORDER PAID:",
                    updatedOrder?._id
                );

                console.log(
                    "🛒 WEBHOOK CART CLEARED:",
                    updatedUser?.cartItems
                );

                break;
            }


            // ======================================
            // CHECKOUT EXPIRED
            // ======================================

            case "checkout.session.expired": {

                const session =
                    event.data.object;

                const { orderId } =
                    session.metadata || {};

                if (orderId) {

                    await Order.findByIdAndUpdate(
                        orderId,
                        {
                            $set: {
                                isPaid: false,
                            },
                        }
                    );

                    console.log(
                        "⚠️ CHECKOUT EXPIRED:",
                        orderId
                    );
                }

                break;
            }


            default:

                console.log(
                    `Unhandled event: ${event.type}`
                );
        }

        return res.json({
            received: true,
        });

    } catch (err) {

        console.log(
            "WEBHOOK PROCESSING ERROR:",
            err.message
        );

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


// ==========================================
// GET USER ORDERS
// /api/order/user
// ==========================================

export const getUserOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            userId: req.userId,

            $or: [
                {
                    paymentType: "COD",
                },
                {
                    paymentType: "Online",
                    isPaid: true,
                },
            ],
        })
            .populate("items.product")
            .populate("address")
            .sort({
                createdAt: -1,
            });

        console.log(
            "📦 USER ORDERS:",
            orders.length
        );

        return res.json({
            success: true,
            orders,
        });

    } catch (err) {

        console.log(
            "GET ORDERS ERROR:",
            err.message
        );

        return res.json({
            success: false,
            message: err.message,
        });
    }
};


// ==========================================
// GET ALL ORDERS
// /api/order/seller
// ==========================================

export const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            $or: [
                {
                    paymentType: "COD",
                },
                {
                    paymentType: "Online",
                    isPaid: true,
                },
            ],

        })
            .populate("items.product")
            .populate("address")
            .sort({
                createdAt: -1,
            });

        return res.json({
            success: true,
            orders,
        });

    } catch (err) {

        console.log(
            "GET ALL ORDERS ERROR:",
            err.message
        );

        return res.json({
            success: false,
            message: err.message,
        });
    }
};
