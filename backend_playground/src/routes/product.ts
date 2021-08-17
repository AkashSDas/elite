import { Router } from "express";
import { createProduct, getProductById } from "../controllers/product";
import { getUserById } from "../controllers/user";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth";

export const router = Router();

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes

router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
