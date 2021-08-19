import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { isAuthenticated } from "../lib/auth";
import StripeCheckout from "react-stripe-checkout";

function StripeCheckoutSection({
  products,
  setReload = (func) => func,
  reload = undefined,
}) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const router = useRouter();

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => (amount = amount + product.price));
    return amount;
  };

  const makePayment = (token) => {};

  const showStripeBtn = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey=""
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Cloths"
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckout>
    ) : (
      <button
        onClick={() => router.push("/signin")}
        className="btn btn-warning"
      >
        Go to login
      </button>
    );
  };

  return (
    <section>
      <h3 className="text-white">Stripe checkout - {getFinalPrice()}</h3>
      {showStripeBtn()}
    </section>
  );
}

export default StripeCheckoutSection;
