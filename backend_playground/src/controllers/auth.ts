import { Request, Response, NextFunction } from "express";
import jwt from "express-jwt";
import { validationResult } from "express-validator";
import * as jsonwebtoken from "jsonwebtoken";

import { User } from "../models/user";

export function signout(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
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

export function sigin(req: Request, res: Response) {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({
      error: errors.array()[0].msg,
    });

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password does't match",
      });
    }

    // create token
    const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_KEY);

    // put token in cookie (for dev purpose keep expiry date long, otherwise keep it short)
    res.cookie("token", token, {
      expires: new Date(Number(new Date()) + 9999),
    });

    // send response to front end
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
}

// Protected route
export const isSignedIn = jwt({
  secret: process.env.SECRET_KEY,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// Custom middleware

// Extending he Request type to have custom properties like
// profile, auth, etc...
// https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
interface IIsAuthenticatedRequest extends Request {
  user: any;
  profile: any;
  auth: any;
}

export function isAuthenticated(
  req: IIsAuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const profile = req.profile; // from front end
  const auth = req.auth; // this property is set on isSignedIn middleware (define above this middleware)
  const sameUser = req.profile._id == req.auth._id;
  const check = profile && auth && sameUser;

  if (!check) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  next();
}

interface IIsAdminRequest extends Request {
  profile: any;
}

export function isAdmin(
  req: IIsAdminRequest,
  res: Response,
  next: NextFunction
) {
  if (req.profile.role === 0) {
    // Regular user
    return res.status(403).json({
      error: "Your not admin, Access denied",
    });
  }

  next();
}
