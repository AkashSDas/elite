import { Request, Response } from "express";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";
import { getOrCreateCustomer } from "./utils/customer";
import { createPaymentIntentAndCharge } from "./utils/payments";

export async function oneTimePayment(req: Request, res: Response) {
  const [customer, err1] = await runAsync(getOrCreateCustomer(req.profile._id));
  if (err1)
    return responseMsg(res, {
      status: 400,
      message: "Failed to charge customer",
    });

  if (!customer)
    return responseMsg(res, {
      status: 400,
      message: "Login to make the payment",
    });

  const [data, err] = await runAsync(
    createPaymentIntentAndCharge(
      req.body.amount,
      customer.id,
      req.body.paymentMethod
    )
  );

  if (err || data[1] || !data[0])
    return responseMsg(res, {
      status: 400,
      message: "Failed to charge customer",
    });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully charged customer",
    data: { setupIntent: data[0] },
  });
}
