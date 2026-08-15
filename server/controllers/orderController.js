import Order from "../models/order.js"
import Product from "../models/product.js"
import Stripe from "stripe"
import User from "../models/user.js"
// PLACE ORDER COD
// /api/order/cod
export const placeOrderCod = async (req, res) => {
    try {
        const { items, address } = req.body
        if (!address || !items || items.length === 0) {
            return res.json({success: false, message: "Invalid data"})}

        // Calculate amount
        let amount = await items.reduce(async (acc, item) => {
            const productData = await Product.findById(item.product)
            if (!productData) {
                throw new Error("Product not found")
            }
            return (await acc) +productData.offerPrice * item.quantity}, 0)

        // Add 2% tax
        amount += Math.floor(amount * 0.02)

        // Create COD order
        await Order.create({
            userId: req.userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })
        return res.json({success: true, message: "Order Placed Successfully"})
    } catch (err) {
        console.log("COD ORDER ERROR:", err.message)
        return res.json({success: false, message: err.message})}}

// PLACE ORDER STRIPE
// /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body
        const { origin } = req.headers

        if (!address || !items || items.length === 0) {
            return res.json({success: false, message: "Invalid data"})}
        let productData = []
        // Calculate amount
        let amount = await items.reduce(async (acc, item) => {
            const productDataFromDB = await Product.findById(item.product)
            if (!productDataFromDB) {
                throw new Error("Product not found")
            }
            productData.push({
                name: productDataFromDB.name,
                price: productDataFromDB.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + productDataFromDB.offerPrice * item.quantity
        }, 0)

        // Add 2% tax
        amount += Math.floor(amount * 0.02)

        // Create order in database
        const newOrder = await Order.create({
            userId: req.userId,
            items,
            amount,
            address,
            paymentType: "Online",
            isPaid: false  
        })

        // Stripe gateway initialize
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        // Stripe line items
        const line_items = productData.map((item) => {
            return {price_data: { currency: "usd", product_data: {name: item.name}, unit_amount:Math.floor(item.price * 100)},
                quantity: item.quantity
            }})
            
        // Create Stripe session
        const session =
            await stripeInstance.checkout.sessions.create({line_items, mode: "payment", success_url:`${origin}/loader?next=my-orders`, cancel_url:`${origin}/cart`, metadata: {orderId: newOrder._id.toString(), userId: req.userId}})
        return res.json({success: true, url: session.url})
    } catch (err) {
        console.log("STRIPE ORDER ERROR:", err.message)
        return res.json({success: false, message: err.message})}}

// Stripe webhooks to verify payments action: /stripe
export const stripeWebhooks = async (req, res) => {

    const stripeInstance = new Stripe(
        process.env.STRIPE_SECRET_KEY
    )

    const sig = req.headers["stripe-signature"]

    let event

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        console.log("WEBHOOK ERROR:", err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {

        case "checkout.session.completed": {

            const session = event.data.object

            console.log("🔥 STRIPE PAYMENT SUCCESS")
            console.log("Session ID:", session.id)
            console.log("Metadata:", session.metadata)

            const { orderId, userId } = session.metadata

            await Order.findByIdAndUpdate(
                orderId,
                { isPaid: true }
            )

            await User.findByIdAndUpdate(
                userId,
                { cartItems: {} }
            )

            console.log("✅ Order marked as paid:", orderId)

            break
        }

        case "checkout.session.expired": {

            const session = event.data.object

            const { orderId } = session.metadata || {}

            if (orderId) {
                await Order.findByIdAndUpdate(
                    orderId,
                    { isPaid: false }
                )
            }

            break
        }

        default:
            console.log(`Unhandled event: ${event.type}`)
    }

    res.json({ received: true })
}

// GET USER ORDERS
// /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.userId,
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]})
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 })
        res.json({success: true, orders})
    } catch (err) {
        console.log("GET ORDERS ERROR:", err.message)
        res.json({success: false, message: err.message})}}

// GET ALL ORDERS
// /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 })

        res.json({success: true, orders})
    } catch (err) {
        console.log("GET ALL ORDERS ERROR:", err.message)
        res.json({success: false, message: err.message})}}