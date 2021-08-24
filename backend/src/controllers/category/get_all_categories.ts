import { Request, Response } from "express";
import Category, { CategoryDocument } from "../../models/category";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

async function getAllCategories(req: Request, res: Response) {
  /// Only admin will be able to get all users
  //   if (req.profile.role !== 99)
  //     return responseMsg(res, {
  //       status: 401,
  //       message: "You are not authorized to make this request",
  //     });

  /// if their is next id then use it to get data from that document
  /// if it is undefined then paginateUser will give documents from start
  const next = req.query.next;

  const LIMIT = 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : LIMIT;

  const [data, err] = await runAsync(
    await (Category as any).paginateCategory({
      limit,
      paginatedField: "updatedAt",
      next,
    })
  );

  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Failed to retrive categories",
    });

  /// since traditional for loop is more performant then forEach and
  /// here we can have lots of data to loop, so tranditional for loop
  /// is used
  const categories = [];
  for (let i = 0; i < data.results.length; i++) {
    const category: CategoryDocument = data.results[i];
    categories.push({
      _id: category._id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  }

  return responseMsg(res, {
    status: 200,
    error: false,
    message: `Retrived ${categories.length} categories successfully`,
    data: {
      categories,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
}

export default getAllCategories;
