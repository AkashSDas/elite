import { useEffect } from "react";
import { useState } from "react";
import BaseLayout from "../components/base_layout";
import Card from "../components/card";
import StripeCheckoutSection from "../components/stripe_checkout";
import { loadCart } from "../lib/cart";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadProduct = () => (
    <div>
      <h2>Load product</h2>
      {products.map((product, key: number) => (
        <Card
          showAddToCart={false}
          showRemoveFromCart={true}
          key={key}
          product={product}
          reload={reload}
          setReload={setReload}
        />
      ))}
    </div>
  );

  const loadCheckout = () => (
    <StripeCheckoutSection
      products={products}
      setReload={setReload}
      reload={reload}
    />
  );

  return (
    <BaseLayout title="Product in cart">
      <div className="row text-center">
        <div className="row">
          <div className="col-6">{loadProduct()}</div>
          <div className="col-6">{loadCheckout()}</div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Cart;
