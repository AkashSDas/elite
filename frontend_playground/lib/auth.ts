import { fetchFromAPI, runAsync } from "./utils";

export const signup = async (user) => {
  const [response, error] = await runAsync(
    fetchFromAPI("/auth/signup", {
      method: "POST",
      body: user,
    })
  );

  if (response) return response.json();
  if (error) console.error(error);
};

export const signin = async (user) => {
  const [response, error] = await runAsync(
    fetchFromAPI("/auth/signin", {
      method: "POST",
      body: user,
    })
  );

  if (response) return response.json();
  if (error) console.error(error);
};

export function authenticate(data, next) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  return false;
}

export const signout = async (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");

    // position of this call depends where you would prefer it either after user if logged out of backend OR as here before user is logged out of backend
    next();

    const [response, error] = await runAsync(
      fetchFromAPI("/auth/signin", {
        method: "GET",
        body: null,
      })
    );

    if (response) return response.json();
    if (error) console.error(error);
  }
};
