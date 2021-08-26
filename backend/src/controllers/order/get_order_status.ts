import { Request, Response } from "express";
import { Order } from "../../models/order";
import { responseMsg } from "../json_response";

function getOrderStatus(req: Request, res: Response) {
  // Both of the below values are giving error (saying enumValues OR options doesn't exists
  // n SchemaType), therefore casting order to any type and then using it
  // Order.schema.path("status").enumValues;
  // Order.schema.path("status").options.enum;

  let order: any = Order.schema.path("status");
  order = order.enumValues;
  // order = order.options.enum

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Order status values are retrived successfully",
    data: { order },
  });
}

export default getOrderStatus;
