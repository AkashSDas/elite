import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth";
import { createOrder, getOrderById } from "../controllers/order";
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
