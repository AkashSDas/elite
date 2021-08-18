import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import AdminCheck from "../../../../../components/admin_check";
import BaseLayout from "../../../../../components/base_layout";
import { isAuthenticated } from "../../../../../lib/auth";
import { getProduct, updateProduct } from "../../../../../lib/product";

function UpdateProduct() {
  const router = useRouter();
  const [productId, setProductId] = useState(null);

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: false,
    createdProduct: "",
    getARedirect: false,
    formData: null,
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    createdProduct,
    error,
    formData,
    getARedirect,
    loading,
  } = values;

  const preload = async (productId: string) => {
    const [data, err] = await getProduct(productId);

    console.log(data);
    if (data?.error) setValues({ ...values, error: data.error });
    else {
      setValues({
        ...values,
        name: data.name,
        description: data.description,
        category: data.category._id,
        stock: data.stock,
        price: data.price,
        formData: new FormData(),
      });
    }
  };

  useEffect(() => {
    if (router.query?.productId) {
      setProductId(router.query.productId);
      preload(router.query.productId as string);
    }
  }, [router.query?.productId]);

  const backBtn = () => (
    <div className="mt-3">
      <button
        className="btn btn-info btn-sm text-white"
        onClick={() => router.back()}
      >
        Go back
      </button>
    </div>
  );

  const successMsg = () => (
    <div
      className="alert alert-success mt-3"
      style={{
        display: createdProduct.length > 1 ? "" : "none",
      }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const onSubmit = async (event) => {
    console.log("hiii");

    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    const [data, error] = await updateProduct(
      productId as string,
      user._id,
      token,
      formData
    );
    console.log(data, error);

    if (data.error) setValues({ ...values, error: data.error });
    else {
      setValues({
        ...values,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        photo: data.photo,
        loading: false,
        createdProduct: data.name,
      });
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((item, key: number) => (
              <option key={key} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <AdminCheck>
      <BaseLayout
        title="Create products"
        description="Create new products"
        className="container bg-info p-4"
      >
        <main>
          {backBtn()}

          <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
              {successMsg()}
              {createProductForm()}
            </div>
          </div>
        </main>
      </BaseLayout>
    </AdminCheck>
  );
}

export default UpdateProduct;
