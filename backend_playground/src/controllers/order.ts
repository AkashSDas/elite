import { NextFunction, Request, Response } from "express";
import { Order } from "../models/order";

declare module "express-serve-static-core" {
  interface Request {
    order: any;
  }
}

export function getOrderById(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in database",
        });
      }

      req.order = order;
      next();
    });
}

export function createOrder(req: Request, res: Response) {
  req.body.order.user = req.profile.user;
  const order = new Order(req.body.order);
  order.save((err, o) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in database",
      });
    }

    return res.json(o);
  });
}

export function getAllOrders(req: Request, res: Response) {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in database",
        });
      }

      return res.json(orders);
    });
}

export function getOrderStatus(req: Request, res: Response) {
  let order: any = Order.schema.path("status");
  order = order.enumValues;
  // order = order.options.enum
  res.json(order);

  // Both of the below values are giving error (saying enumValues OR options doesn't exists
  // n SchemaType)
  // Order.schema.path("status").enumValues;
  // Order.schema.path("status").options.enum;
}

export function updateStatus(req: Request, res: Response) {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    { new: true, useFindAndModify: true },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update order status",
        });
      }

      return res.json(order);
    }
  );
}
