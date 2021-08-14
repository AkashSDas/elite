import { Router } from "express";

import { signout, signup } from "../controllers/auth";

export const router = Router();

router.get("/signout", signout);
router.post("/signup", signup);
