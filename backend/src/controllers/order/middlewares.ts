import { NextFunction, Request, Response } from "express";
import { Order } from "../../models/order";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

export async function getOrderById(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  const [data, err] = await runAsync(Order.findById(id).exec());

  if (err || !data)
    return responseMsg(res, {
      status: 400,
      message: "No product found",
    });

  const [order, e] = await runAsync(
    data.populate("products.product", "name price")
  );

  if (e)
    return responseMsg(res, {
      status: 400,
      message: "No product found",
    });

  req.order = order;
  next();
}
