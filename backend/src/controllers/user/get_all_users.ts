import { Request, Response } from "express";
import User, { UserDocument } from "../../models/user";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

async function getAllUsers(req: Request, res: Response) {
  /// Only admin will be able to get all users
  if (req.profile.role !== 99)
    return responseMsg(res, {
      status: 401,
      message: "You are not authorized to make this request",
    });

  /// if their is next id then use it to get data from that document
  /// if it is undefined then paginateUser will give documents from start
  const next = req.query.next;

  const LIMIT = 2;
  const [data, err] = await runAsync(
    await (User as any).pagniateUser({
      limit: LIMIT,
      paginatedField: "updatedAt",
      next,
    })
  );

  /// since traditional for loop is more performant then forEach and
  /// here we can have lots of data to loop, so tranditional for loop
  /// is used
  const users = [];
  for (let i = 0; i < data.results.length; i++) {
    const user: UserDocument = data.results[i];
    users.push({
      _id: user._id,
      role: user.role,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Failed to retrive users",
    });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: `Retrived ${LIMIT} users successfully`,
    data: {
      users,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
}

export default getAllUsers;
