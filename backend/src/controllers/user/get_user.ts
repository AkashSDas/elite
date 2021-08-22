import { Request, Response } from "express";
import { UserDocument } from "../../models/user";
import { responseMsg } from "../json_response";

interface IGetUserRequest extends Request {
  profile: UserDocument;
}

/// Some user data are irrelevant for client, so removing it from
/// profile in req which contains user data
function getUser(req: IGetUserRequest, res: Response) {
  req.profile.salt = undefined;
  req.profile.encryptPassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "User data",
    data: {
      user: req.profile,
    },
  });
}

export default getUser;
