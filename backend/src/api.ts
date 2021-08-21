import express from "express";
import cors from "cors";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing incoming data

// Test api routes
// app.get("/", (req: Request, res: Response) => {
//   res.send("hello world");
// });
