import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import getAllUsers from "../controllers/user/get_all_users";
import updateUser from "../controllers/user/update_user";

export const router = Router();

router.get("/all-users", isSignedIn, isAuthenticated, getAllUsers);
router.put("/", isSignedIn, isAuthenticated, updateUser);
