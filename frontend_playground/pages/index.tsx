import BaseLayout from "../components/base_layout";
import ImageHelper from "../components/image_helper";
import styles from "../styles/Home.module.css";

function Index() {
  return (
    <BaseLayout title="Home Page">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
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
      showAddToCart && (
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
      <div className="card-header lead">A photo from pexels</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          this photo looks great
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ 5</p>
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
