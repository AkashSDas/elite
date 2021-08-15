import { Router } from "express";
import { isAuthenticated, isSignedIn } from "../controllers/auth";
import { getUser, getUserById } from "../controllers/user";

export const router = Router();

router.param("userId", getUserById);

router.get("/:userId", isSignedIn, isAuthenticated, getUser);

// Exporting router way in typescript
// https://stackoverflow.com/questions/37167602/typescript-node-js-express-routes-separated-files-best-practices
// export = router;
// The above way was giving error when router was import like below
// import { router as userRouter } from "./routes/user";
// And was asking to import the router as
// var router = require("./router/user")

// router.get("/all", getAllUsers);
