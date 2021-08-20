import { API, fetchFromAPI, runAsync } from "./utils";

export async function getToken(userId, token) {
  const [res, err] = await runAsync(
    fetchFromAPI(`/payments/braintree/gettoken/${userId}`, {
      method: "GET",
      token,
    })
  );
  return [await res.json(), err];
}

export async function makePayment(userId, token, paymentInfo) {
  const [res, err] = await runAsync(
    fetchFromAPI(`/payment/braintree/${userId}`, {
      method: "POST",
      token,
      body: paymentInfo,
    })
  );
  return [res, err];
}
