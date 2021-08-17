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
  req.body.order.user = req.profile();
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
