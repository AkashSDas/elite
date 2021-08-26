import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import createOrder from "../controllers/order/create";
import getAllOrders from "../controllers/order/get_all_orders";
import getOrder from "../controllers/order/get_order";
import getOrderStatus from "../controllers/order/get_order_status";
import { getOrderById } from "../controllers/order/middlewares";
import updateOrderStatus from "../controllers/order/update_order_status";
import getUserById from "../controllers/user/get_user_by_id";

export const router = Router();

/// Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

/// Routes

/// Order in which routes are listed here matters
/// the below get route should be on top of get route
/// with route as /:userId otherwise /status will be consider
/// as userId controller getAllOrders with all auth check will be
/// runned instead of getOrderStatus
router.get("/status", getOrderStatus);

router.post("/:userId", isSignedIn, isAuthenticated, createOrder);
router.get("/:userId/:orderId", isSignedIn, isAuthenticated, getOrder);
router.get("/:userId", isSignedIn, isAuthenticated, getAllOrders);
router.put(
  "/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  updateOrderStatus
);
