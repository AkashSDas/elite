import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { addItemToCart } from "../lib/cart";
import ImageHelper from "./image_helper";

function Card({ product, showAddToCart = true, showRemoveFromCart = false }) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const getARedirect = () => (redirect ? router.push("/cart") : null);

  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const showAddToCartFunc = (showAddToCart) => {
    return (
      showAddToCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCartFunc = (showRemoveFromCart) => {
    return (
      showRemoveFromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
          {getARedirect()}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${product.price}</p>
        <div className="row">
          <div className="col-12">{showAddToCartFunc(showAddToCart)}</div>
          <div className="col-12">
            {showRemoveFromCartFunc(showRemoveFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
