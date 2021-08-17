import { Router } from "express";
import { getCategoryById } from "../controllers/category";
import { createProduct } from "../controllers/product";
import { getUserById } from "../controllers/user";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth";

export const router = Router();

// params
router.param("userId", getUserById);
router.param("category", getCategoryById);

// routes

router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
