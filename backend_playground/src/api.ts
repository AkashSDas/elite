import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

// App
export const app = express();

// Middlewares

app.use(cookieParser());
app.use(cors());

////// APIs //////

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
});

app.get("/about", (req: Request, res: Response, next: NextFunction) => {
  res.send("about us");
});

// Using middleware
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log("Authenticating!");
  next();
};

app.get("/dashboard", isAuthenticated, (req: Request, res: Response) => {
  res.send("Dashboard");
});
