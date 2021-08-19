import { connect, Environment } from "braintree";
import { Request, Response } from "express";

const braintree = connect({
  environment: Environment.Sandbox,
  merchantId: "",
  publicKey: "",
  privateKey: "",
});

export async function getToken(req: Request, res: Response) {
  try {
    const response = await braintree.clientToken.generate({});
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function makePayment(req: Request, res: Response) {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  try {
    const response = await braintree.transaction.sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
}
