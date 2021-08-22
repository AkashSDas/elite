import { NextFunction, Request, Response } from "express";
import User, { UserDocument } from "../../models/user";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

interface IGetUserByIdRequest extends Request {
  profile: UserDocument;
}

async function getUserById(
  req: IGetUserByIdRequest,
  res: Response,
  next: NextFunction,
  userId: string
) {
  const [data, error] = await runAsync(User.findById(userId).exec());
  if (error || !data)
    return responseMsg(res, {
      status: 400,
      message: "User does not exists",
    });

  const user: UserDocument = data;
  req.profile = user;
  next();
}

export default getUserById;
