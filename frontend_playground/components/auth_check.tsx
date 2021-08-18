import Link from "next/link";
import { isAuthenticated } from "../lib/auth";

interface Props {
  children: JSX.Element;
}

function AuthCheck(props: Props) {
  if (isAuthenticated()) return props.children;
  return (
    <main>
      You are not authenticated. To login{" "}
      <Link href="/signin">
        <a>click here</a>
      </Link>
    </main>
  );
}

export default AuthCheck;
