import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth";
import { getToken, makePayment } from "../controllers/braintree_payment";
import { getUserById } from "../controllers/user";

export const router = Router();

router.param("userId", getUserById);

router.get("/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post("/:userId", isSignedIn, isAuthenticated, makePayment);
