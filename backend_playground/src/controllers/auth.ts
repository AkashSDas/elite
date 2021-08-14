import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User } from "../models/user";

export function signout(req: Request, res: Response) {
  res.json({
    message: "sign out",
  });
}

export function signup(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({
      error: errors.array()[0].msg,
    });

  const user = new User(req.body);
  user.save((err, user) => {
    return err
      ? res.status(400).json({
          error: "Not able to save user in database",
        })
      : res.json({
          name: user.username,
          email: user.email,
          id: user._id,
        });
  });
}
