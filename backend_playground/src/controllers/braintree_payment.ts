import { BraintreeGateway, Environment } from "braintree";
import { Request, Response } from "express";

const braintree = new BraintreeGateway({
  environment: Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
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

    // sending json might give errors because of formatting of json
    // so not using json here
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
}
