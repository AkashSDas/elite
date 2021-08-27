import express from "express";
import cors from "cors";
import { router as authRouter } from "./routes/auth";
import { router as userRouter } from "./routes/user";
import { router as categoryRouter } from "./routes/category";
import { router as productRouter } from "./routes/product";
import { router as orderRouter } from "./routes/order";
import { router as paymentRouter } from "./routes/payment";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing incoming data

// Test api routes
// app.get("/", (req: Request, res: Response) => {
//   res.send("hello world");
// });

/// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
