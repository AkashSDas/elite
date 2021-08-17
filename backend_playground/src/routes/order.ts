import { Router } from "express";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateStatus,
  getOrderStatus,
} from "../controllers/order";
import { updateProductStock } from "../controllers/product";
import { getUserById, pushOrderInPurchaseList } from "../controllers/user";

export const router = Router();

router.param("userId", getUserById);
router.param("orderId", getOrderById);

// create
router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateProductStock,
  createOrder
);

// read

router.get("/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

// status of order
router.get(
  "/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

router.put(
  "/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
