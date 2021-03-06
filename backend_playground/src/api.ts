import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { router as authRouter } from "./routes/auth";
import { router as userRouter } from "./routes/user";
import { router as categoryRouter } from "./routes/category";
import { router as productRouter } from "./routes/product";
import { router as orderRouter } from "./routes/order";
import { router as stripePaymentRouter } from "./routes/stripe_payment";
import { router as braintreePaymentRouter } from "./routes/braintree_payment";

// App
export const app = express();

// Middlewares

app.use(cookieParser());
app.use(cors());

// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4#:~:text=Explanation%3A%20The%20default%20value%20of,%2Dof%2Dthe%2Dbox.
app.use(express.json());

////// APIs //////

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.send("hello world");
// });

// app.get("/about", (req: Request, res: Response, next: NextFunction) => {
//   res.send("about us");
// });

// // Using middleware
// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   console.log("Authenticating!");
//   next();
// };

// app.get("/dashboard", isAuthenticated, (req: Request, res: Response) => {
//   res.send("Dashboard");
// });

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/payments/stripe", stripePaymentRouter);
app.use("/api/payments/braintree", braintreePaymentRouter);
