import { Router } from "express";
import getAllUsers from "../controllers/user/get_all_users";

export const router = Router();

router.get("/all-users", getAllUsers);
