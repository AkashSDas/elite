import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProductById,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} from "../controllers/product";
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

router.get("/:productId", getProduct);

// Tmp route to get photo for a product
router.get("/photo/:productId", photo);

router.delete(
  "/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.put(
  "/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.get("/", getAllProducts);

router.get("/categories", getAllUniqueCategories);
