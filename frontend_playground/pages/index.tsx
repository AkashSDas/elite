import { useEffect } from "react";
import { useState } from "react";
import BaseLayout from "../components/base_layout";
import ImageHelper from "../components/image_helper";
import { getAllProducts, getProduct } from "../lib/product";
import styles from "../styles/Home.module.css";

function Index() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = async () => {
    const [data, err] = await getAllProducts();
    if (data.error) setError(true);
    else setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <BaseLayout title="Home Page">
      <div className="row mb-5">
        <h1 className="text-white">All products</h1>

        <div className="row">
          {products.map((product, key: number) => (
            <div key={key} className="col-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

function Card({ product, showAddToCart = true, showRemoveFromCart = false }) {
  const showAddToCartFunc = (showAddToCart) => {
    return (
      showAddToCart && (
        <button
          onClick={() => {}}
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

export default Index;
