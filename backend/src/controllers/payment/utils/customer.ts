import Stripe from "stripe";
import { stripe } from "../../..";
import User, { UserDocument } from "../../../models/user";
import { runAsync } from "../../../utils";

/**
 * Gets the existing Stripe customer or create a new record
 * This function will link the MongoDB user to a Stripe Customer
 * record
 *
 * This is a very useful helper function in our Stripe backend and
 * can be used in combination with other endpoints like when we
 * create a setup intent to save a card or to get the user's payment
 * method
 */
export async function getOrCreateCustomer(
  userId: string,
  params?: Stripe.CustomerCreateParams
) {
  const [data, err] = await runAsync(User.findById(userId).exec());
  if (err || !data) return null;

  const user: UserDocument = data;
  if (!user.stripeCustomerId) {
    /// Create new customer

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        mongodbId: userId,
      },
      ...params,
    });

    /// Only drawback of adding the stripeCustomerId in the mongodb user
    /// doc is that the data become stale
    const [updatedUser, err] = await runAsync(
      User.updateOne(
        { _id: userId },
        { $set: { stripeCustomerId: customer.id } },
        { new: true, useFindAndModify: true }
      ).exec()
    );

    return customer;
  }

  return (await stripe.customers.retrieve(
    user.stripeCustomerId
  )) as Stripe.Customer;
}
