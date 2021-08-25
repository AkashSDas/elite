import { Request, NextFunction, Response } from "express";
import Product from "../../models/product";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

/// Update product stock whenever someone successfully pays for it
async function updateProductStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /// Going through each product that user has successfully payed for
  /// in the order and creating updateOne operation for each where stock
  /// is descreased and sold is increased
  let operations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },

        /// increasing sold and decreasing stock
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });

  /// Performing bulk write
  const options = {};
  const [_, err] = await runAsync(Product.bulkWrite(operations, options));
  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Failed to update product stock",
    });

  next();
}

export default updateProductStock;
