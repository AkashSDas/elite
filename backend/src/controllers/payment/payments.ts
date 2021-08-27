import { stripe } from "../..";

/**
 * Create a Payment Intent and attempt to charge right away,
 * must have an existing customer with a saved card payment method on file.
 */

export async function createPaymentIntentAndCharge(
  amount: number,
  customer: string,
  payment_method: string
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    customer,
    payment_method,
    currency: "usd",
    off_session: true,
    confirm: true,
  });

  return paymentIntent;
}
