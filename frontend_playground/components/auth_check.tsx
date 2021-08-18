import Link from "next/link";
import { isAuthenticated } from "../lib/auth";
import BaseLayout from "./base_layout";

interface Props {
  children: JSX.Element;
}

function AuthCheck(props: Props) {
  if (isAuthenticated()) return props.children;
  return (
    <BaseLayout>
      <main>
        You are not authenticated. To login{" "}
        <Link href="/signin">
          <a>click here</a>
        </Link>
      </main>
    </BaseLayout>
  );
}

export default AuthCheck;
