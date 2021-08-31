import { fetchFromAPI } from "./base";

/// Sign up ///

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export async function signup(data: SignUpData) {
  return await fetchFromAPI("/auth/signup", { method: "POST", data });
}

/// Login ///

export interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  return await fetchFromAPI("/auth/login", { method: "POST", data });
}

/// User data in localstorage ///

export function saveUserDataInLocalStorage(data: any, next: Function) {
  /// saving logged in user auth data
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}

export function isAuthenticated() {
  /// Checking if user data is there in localstorage
  /// if not then user is not authenticated

  if (typeof window === "undefined") return false;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  return false;
}
