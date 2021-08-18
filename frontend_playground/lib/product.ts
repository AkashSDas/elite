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
