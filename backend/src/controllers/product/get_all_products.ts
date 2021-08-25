import { Request, Response } from "express";
import Product, { ProductDocument } from "../../models/product";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

async function getAllProducts(req: Request, res: Response) {
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
    await (Product as any).paginateProduct({
      limit,
      paginatedField: "updatedAt",
      next,
    })
  );

  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Failed to retrive products",
    });

  /// since traditional for loop is more performant then forEach and
  /// here we can have lots of data to loop, so tranditional for loop
  /// is used
  const products = [];
  for (let i = 0; i < data.results.length; i++) {
    const [prod, err] = await runAsync(
      Product.populate(data.results[i], "category")
    );

    if (err)
      return responseMsg(res, {
        status: 400,
        message: "Failed to retrive product",
      });

    const product: ProductDocument = prod;

    products.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      sold: product.sold,
      photoURL: product.photoURL,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }

  return responseMsg(res, {
    status: 200,
    error: false,
    message: `Retrived ${products.length} products successfully`,
    data: {
      products,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
}

export default getAllProducts;
