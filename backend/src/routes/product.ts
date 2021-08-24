import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import createProduct from "../controllers/product/create";
import getUserById from "../controllers/user/get_user_by_id";

export const router = Router();

/// Params
router.param("userId", getUserById);

/// Routes
router.post("/:userId", isSignedIn, isAuthenticated, createProduct);
