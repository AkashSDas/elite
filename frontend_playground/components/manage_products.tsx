import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../lib/auth";
import { deleteProduct, getAllProducts } from "../lib/product";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = async () => {
    const [data, err] = await getAllProducts();
    if (data.error) console.log(data.error);
    else setProducts(data);
  };

  useEffect(() => {
    preload();
  }, []);

  const removeProduct = async (productId: string) => {
    const [data, err] = await deleteProduct(productId, user._id, token);
    if (!data.error) preload();
  };

  return (
    <div>
      <h2 className="mb-4">All products:</h2>
      <Link href="/dashboard/admin">
        <span className="btn btn-info">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {products.length} products
          </h2>

          {products.map((product, key: number) => (
            <div key={key} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link href={`/dashboard/admin/product/update/productId`}>
                  <span className="btn btn-success">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => removeProduct(product._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
