import express from "express";
import cors from "cors";
import { router as authRouter } from "./routes/auth";
import { router as userRouter } from "./routes/user";

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
