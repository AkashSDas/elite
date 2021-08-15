import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

// https://stackoverflow.com/questions/58200432/argument-of-type-req-request-res-iresponse-next-nextfunction-void-is
declare module "express-serve-static-core" {
  interface Request {
    profile: any;
  }
}

// For more info on extending features of Request, Response, etc... read the below post
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript

export function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  User.findById(id).exec((err, user): any => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in database",
      });
    }

    req.profile = user;
    next();
  });
}

export function getUser(req: Request, res: Response) {
  // Some data are irrelevant for client side so assigning them
  // as undefined
  req.profile.salt = undefined;
  req.profile.encryptPassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
}
