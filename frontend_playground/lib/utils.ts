export const API = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export async function runAsync(promise: Promise<any>) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export function fetchFromAPI(
  endpointURL: string,
  opts: {
    method: string;
    body: any;
  }
) {
  const { method, body } = { ...opts };
  const token = null;

  return fetch(`${API}${endpointURL}`, {
    method,
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // },
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
