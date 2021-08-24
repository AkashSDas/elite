import { Request, Response } from "express";
import { responseMsg } from "../json_response";

function getProduct(req: Request, res: Response) {
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully retrived product",
    data: { product: req.product },
  });
}

export default getProduct;
