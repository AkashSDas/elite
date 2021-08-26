import { Request, Response } from "express";
import { Order } from "../../models/order";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

async function updateOrderStatus(req: Request, res: Response) {
  const [data, err] = await runAsync(
    Order.findByIdAndUpdate(
      { _id: req.order._id },
      { $set: { status: req.body.status } },
      { new: true, useFindAndModify: true }
    ).exec()
  );

  if (err || !data)
    return responseMsg(res, {
      status: 400,
      message: "Order status was not updated",
    });

  const [order, error] = await runAsync(
    Order.populate(data, { path: "user", select: "_id username" })
  );

  if (error)
    return responseMsg(res, {
      status: 400,
      message: "Order status was not updated",
    });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Order status updated successfully",
    data: { order },
  });
}

export default updateOrderStatus;
