import { fetchFromAPI, runAsync } from "./utils";

export async function createOrder(userId: string, token: string, order: any) {
  const [res, err] = await runAsync(
    fetchFromAPI(`/order/create/${userId}`, {
      method: "POST",
      body: { order },
    })
  );

  return [await res.json(), err];
}

export function cartEmpty(next: Function) {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    next();
  }
}
