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
