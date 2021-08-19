import { Router } from "express";
import { makePayment } from "../controllers/stripe_payment";

export const router = Router();

router.post("/", makePayment);
