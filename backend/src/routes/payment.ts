import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth/middlewares";
import { oneTimePayment } from "../controllers/payment/on_time_payment";
import getUserById from "../controllers/user/get_user_by_id";

export const router = Router();

/// Params
router.param("userId", getUserById);

/// Routes
router.post(
  "/:userId/one-time-payment",
  isSignedIn,
  isAuthenticated,
  oneTimePayment
);
