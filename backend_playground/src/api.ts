import express, { NextFunction, Request, Response } from "express";

// App
export const app = express();

////// APIs //////

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
});

app.get("/about", (req: Request, res: Response, next: NextFunction) => {
  res.send("about us");
});
