import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import getAllUsers from "../controllers/user/get_all_users";
import getUserById from "../controllers/user/get_user_by_id";
import updateUser from "../controllers/user/update_user";

export const router = Router();

router.param("userId", getUserById);

router.get("/:userId/all-users", isSignedIn, isAuthenticated, getAllUsers);
router.put("/:userId", isSignedIn, isAuthenticated, updateUser);
