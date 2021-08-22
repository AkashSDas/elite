import { Request, Response } from "express";
import User, { UserDocument } from "../../models/user";
import { runAsync } from "../../utils";
import { expressValidatorErrorResponse, responseMsg } from "../json_response";

async function signup(req: Request, res: Response) {
  const [errors, jsonRes] = expressValidatorErrorResponse(req, res);
  if (errors) return jsonRes;

  const user = new User(req.body);
  const [data, err] = await runAsync(user.save());

  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Not able to save user in database",
    });

  const savedUser: UserDocument = data;
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "User successfully in the database",
    data: {
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
    },
  });
}

export default signup;
