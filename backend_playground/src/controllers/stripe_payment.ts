import { Request, Response } from "express";
import Stripe from "stripe";
import { v4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2020-08-27",
});

export async function makePayment(req: Request, res: Response) {
  const { token, products } = req.body;

  let amount = 0;
  products.map((product) => (amount = amount + product.price));

  const idempotencyKey = v4();

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  if (customer) {
    try {
      const result = await stripe.charges.create(
        {
          amount: amount * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
        },
        { idempotencyKey }
      );
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: "Cannot charge" });
    }
  }
}
