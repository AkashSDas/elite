import { Request, Response } from "express";
import Category, { CategoryDocument } from "../../models/category";
import { runAsync } from "../../utils";
import { expressValidatorErrorResponse, responseMsg } from "../json_response";

async function createCategory(req: Request, res: Response) {
  const [errors, jsonRes] = expressValidatorErrorResponse(req, res);
  if (errors) return jsonRes;

  const category = new Category(req.body);
  const [data, err] = await runAsync(category.save());
  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Not able to create category",
    });

  const savedCategory: CategoryDocument = data;
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Category created successfully",
    data: {
      category: {
        id: savedCategory._id,
        name: savedCategory.name,
        description: savedCategory.description,
      },
    },
  });
}

export default createCategory;
