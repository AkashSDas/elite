import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import createCategory from "../controllers/category/create";
import deleteCategory from "../controllers/category/delete";
import getAllCategories from "../controllers/category/get_all_categories";
import getCategory from "../controllers/category/get_category";
import { getCategoryById } from "../controllers/category/middlewares";
import updateCategory from "../controllers/category/update";
import getUserById from "../controllers/user/get_user_by_id";

export const router = Router();

/// Paramscategory
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

/// Routes
router.post("/:userId", isSignedIn, isAuthenticated, createCategory);
router.put("/:categoryId/:userId", isSignedIn, isAuthenticated, updateCategory);
router.delete(
  "/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteCategory
);
router.get("/:categoryId", isSignedIn, isAuthenticated, getCategory);
router.get("/", isSignedIn, isAuthenticated, getAllCategories);
