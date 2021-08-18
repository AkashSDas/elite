import { fetchFromAPI, runAsync } from "./utils";

export async function createCategory(
  userId: string,
  token: string,
  category: any
) {
  const [response, error] = await runAsync(
    fetchFromAPI(`/category/create/${userId}`, {
      method: "POST",
      body: { name: category.name },
      token,
    })
  );

  return [response.json(), error];
}

export async function getAllCategories() {
  const [res, err] = await runAsync(
    fetchFromAPI(`/category/`, { method: "GET" })
  );

  return [res.json(), err];
}
