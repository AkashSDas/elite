import { useEffect } from "react";
import { useState } from "react";
import BaseLayout from "../components/base_layout";
import Card from "../components/card";
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
    <div>
      <h2>This sesction is for checkout</h2>
    </div>
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
