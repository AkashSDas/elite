import { Request, Response } from "express";

export function signout(req: Request, res: Response) {
  res.json({
    message: "sign out",
  });
}

export function signup(req: Request, res: Response) {
  console.log(req.body);

  res.json({
    message: "sign up",
  });
}
