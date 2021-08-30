import { runAsync } from "../utils";
import { fetchFromAPI } from "./base";

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export async function signup(data: SignUpData) {
  return await runAsync(fetchFromAPI("/auth/signup", { method: "POST", data }));
}
