import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import createCategory from "../controllers/category/create";
import getUserById from "../controllers/user/get_user_by_id";

export const router = Router();

/// Paramscategory
router.param("userId", getUserById);

/// Routes
router.post("/:userId", isSignedIn, isAuthenticated, createCategory);
