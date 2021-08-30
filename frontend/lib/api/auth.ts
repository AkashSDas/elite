import { runAsync } from "../utils";
import { fetchFromAPI } from "./base";

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export async function signup(data: SignUpData) {
  return await fetchFromAPI("/auth/signup", { method: "POST", data });
}
