import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import createOrder from "../controllers/order/create";
import getAllOrders from "../controllers/order/get_all_orders";
import getOrder from "../controllers/order/get_order";
import { getOrderById } from "../controllers/order/middlewares";
import getUserById from "../controllers/user/get_user_by_id";

export const router = Router();

/// Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

/// Routes
router.post("/:userId", isSignedIn, isAuthenticated, createOrder);
router.get("/:userId/:orderId", isSignedIn, isAuthenticated, getOrder);
router.get("/:userId", isSignedIn, isAuthenticated, getAllOrders);
