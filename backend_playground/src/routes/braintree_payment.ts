import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth";
import { getToken, makePayment } from "../controllers/braintree_payment";

export const router = Router();

router.get("/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post("/:userId", isSignedIn, isAuthenticated, makePayment);
