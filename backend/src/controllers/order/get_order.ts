import { Request, Response } from "express";
import { responseMsg } from "../json_response";

function getOrder(req: Request, res: Response) {
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Order retrived successfully",
    data: { order: req.order },
  });
}

export default getOrder;
