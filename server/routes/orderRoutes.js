import express from "express";
import authUser from "../middlewares/authUser.js";

import {
    placeOrderCod,
    placeOrderStripe,
    verifyStripeSession,
    getUserOrders,
    getAllOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post(
    "/cod",
    authUser,
    placeOrderCod
);

orderRouter.post(
    "/stripe",
    authUser,
    placeOrderStripe
);

// IMPORTANT: authUser nahi lagana
orderRouter.get(
    "/verify-session",
    verifyStripeSession
);

orderRouter.get(
    "/user",
    authUser,
    getUserOrders
);

orderRouter.get(
    "/seller",
    authUser,
    getAllOrders
);

export default orderRouter;
