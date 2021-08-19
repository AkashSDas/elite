import { useEffect } from "react";
import { useState } from "react";
import BaseLayout from "../components/base_layout";
import Card from "../components/card";
import { getAllProducts } from "../lib/product";

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

export default Index;
