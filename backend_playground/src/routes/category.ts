import { Router } from "express";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth";
import {
  createCategory,
  getAllCategory,
  getCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "../controllers/category";
import { getUserById } from "../controllers/user";

export const router = Router();

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// routes

router.post(
  "/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// Read
router.get("/:categoryId", getCategory);
router.get("/", getAllCategory);

// Update
router.put(
  "/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// Delete
router.delete(
  "/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
