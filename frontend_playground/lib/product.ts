import { API, fetchFromAPI, runAsync } from "./utils";

export async function createProduct(
  userId: string,
  token: string,
  product: any
) {
  const [response, error] = await runAsync(
    fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        // contentType here is not going to be application/json
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
  );

  return [response.json(), error];
}

export async function getAllProducts() {
  const [res, err] = await runAsync(
    fetchFromAPI(`/product/`, { method: "GET" })
  );

  return [res.json(), err];
}

export async function getProduct(productId: string) {
  const [res, err] = await runAsync(
    fetchFromAPI(`/product/${productId}`, { method: "GET" })
  );

  return [res.json(), err];
}

export async function updateProduct(
  productId: string,
  userId: string,
  token: string,
  product: any
) {
  const [res, err] = await runAsync(
    fetchFromAPI(`/product/${productId}/${userId}`, {
      method: "PUT",
      token,
      body: product,
    })
  );

  return [res.json(), err];
}

export async function deleteProduct(
  productId: string,
  userId: string,
  token: string
) {
  const [res, err] = await runAsync(
    fetchFromAPI(`/product/${productId}/${userId}`, {
      method: "DELETE",
      token,
    })
  );

  return [res.json(), err];
}
