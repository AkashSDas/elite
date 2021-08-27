import { stripe } from "../../..";
import { runAsync } from "../../../utils";

/**
 * Create a Payment Intent and attempt to charge right away,
 * must have an existing customer with a saved card payment method on file.
 */

export async function createPaymentIntentAndCharge(
  amount: number,
  customer: string,
  payment_method: string
) {
  const [paymentIntent, err] = await runAsync(
    stripe.paymentIntents.create({
      amount,
      customer,
      payment_method,
      currency: "inr",
      off_session: true,
      confirm: true,
    })
  );

  if (err) return [null, err];
  return [paymentIntent, null];
}
