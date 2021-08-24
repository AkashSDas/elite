import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import createProduct from "../controllers/product/create";
import deleteProduct from "../controllers/product/delete";
import { getProductById } from "../controllers/product/middlewares";
import updateProduct from "../controllers/product/update";
import getUserById from "../controllers/user/get_user_by_id";

export const router = Router();

/// Params
router.param("userId", getUserById);
router.param("productId", getProductById);

/// Routes
router.post("/:userId", isSignedIn, isAuthenticated, createProduct);
router.put("/:productId/:userId", isSignedIn, isAuthenticated, updateProduct);
router.delete(
  "/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteProduct
);
