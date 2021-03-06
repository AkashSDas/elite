import { Request, Response } from "express";
import { Order, OrderDocument } from "../../models/order";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

async function getAllOrders(req: Request, res: Response) {
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
    await (Order as any).paginateOrder({
      limit,
      paginatedField: "updatedAt",
      next,
    })
  );

  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Failed to retrive orders",
    });

  /// since traditional for loop is more performant then forEach and
  /// here we can have lots of data to loop, so tranditional for loop
  /// is used
  const orders = [];
  for (let i = 0; i < data.results.length; i++) {
    /// populate user with certain fields only like _id and username
    const [ord, err] = await runAsync(
      Order.populate(data.results[i], { path: "user", select: "_id username" })
    );

    if (err)
      return responseMsg(res, {
        status: 400,
        message: "Failed to retrive orders",
      });

    const order: OrderDocument = ord;

    orders.push({
      _id: order._id,
      user: order.user,
      transactionId: order.transactionId,
      amount: order.amount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }

  return responseMsg(res, {
    status: 200,
    error: false,
    message: `Retrived ${orders.length} orders successfully`,
    data: {
      orders,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
}

export default getAllOrders;
