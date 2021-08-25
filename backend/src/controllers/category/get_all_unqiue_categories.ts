import { Request, Response } from "express";
import Product from "../../models/product";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

/// Get all unique categories using Product model
async function getAllUniqueCategories(req: Request, res: Response) {
  const [data, err] = await runAsync(Product.distinct("category").exec());

  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Failed to get all unique categories",
    });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully retrived all unique categories",
    data: { categories: data },
  });
}

export default getAllUniqueCategories;
