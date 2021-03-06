import axios, { Method } from "axios";
import { runAsync } from "../utils";

export function axiosBaseInstance() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
  });
}

export async function fetchFromAPI(
  endpointURL: string,
  opts: {
    method: Method;
    data?: any;
    token?: string;
  }
) {
  const api = axiosBaseInstance();
  const { method, data, token } = { ...opts };

  return await runAsync(
    api(endpointURL, {
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  );
}
