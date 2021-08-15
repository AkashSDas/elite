import { Request, Response, Router } from "express";
import { check } from "express-validator";

import { isSignedIn, sigin, signout, signup } from "../controllers/auth";

export const router = Router();

router.get("/signout", signout);

const signUpValidations = [
  check("username", "Username should be atleast 2 characters").isLength({
    min: 2,
  }),
  check("email", "Email is required").isEmail(),
  check("password", "Password should be atleast 6 characters").isLength({
    min: 6,
  }),
];
router.post("/signup", signUpValidations, signup);

const signInValidations = [
  check("email", "Email is required").isEmail(),
  check("password", "Password should be atleast 6 characters").isLength({
    min: 6,
  }),
];
router.post("/signin", signInValidations, sigin);

// Playground routes (testing somethings)
// router.get("/playground", isSignedIn, (req: Request, res: Response) => {
//   res.send("Protected route");
//   res.send(res.auth);
// });
