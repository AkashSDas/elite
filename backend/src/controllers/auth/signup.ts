import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../models/user";
import { responseMsg } from "../json_response";

function signup(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return responseMsg(res, {
      status: 422,
      message: errors.array()[0].msg,
    });

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return responseMsg(res, {
        status: 400,
        message: "Not able to save user in database",
      });
    }
  });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "User successfully in the database",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export default signup;
