import { Request, Response } from "express";
import User, { UserDocument } from "../../models/user";
import { runAsync } from "../../utils";
import { expressValidatorErrorResponse, responseMsg } from "../json_response";
import * as jsonwebtoken from "jsonwebtoken";

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

async function login(req: LoginRequest, res: Response) {
  const [errors, jsonRes] = expressValidatorErrorResponse(req, res);
  if (errors) return jsonRes;

  const { email, password } = req.body;

  /// Using promises in mongoose with findOne and exec is used
  /// Below is mongoose offical doc with example of findOne and exec
  /// promise
  /// https://mongoosejs.com/docs/promises.html
  let [data, error] = await runAsync(User.findOne({ email }).exec());

  if (error)
    return responseMsg(res, {
      status: 400,
      message: "User does not exists",
    });

  const user = data as UserDocument;
  if (!user.authenticate(password))
    return responseMsg(res, {
      status: 401,
      message: "Password does not match",
    });

  /// So now user does exist and so logging in

  const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.cookie("token", token, {
    /// for dev purpose keep expiry date long, otherwise keep it short
    expires: new Date(Number(new Date()) + 9999),
  });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully logged in",
    data: {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    },
  });
}

export default login;

/// Here type intersection won't work for adding properties to body
/// as body is defined in Request type. So what happens is that body
/// will be of type any. Here beast will have all of its properties
/// So better way is use interface and extend properties
///
/// Another way if the properties are needed to be used globally by
/// Request type then follow the below stack overflow post
/// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript/51050139
/// Also this way (not global.d.ts or types but extending interface of Request in
/// express-serve-static-core is done in `backend_playground/`)
// type LoginRequest = Request & {
//   body: {
//     email: string;
//     password: string;
//   };
//   beast: {
//     email: string;
//     password: string;
//   };
//   email: string;
// };
