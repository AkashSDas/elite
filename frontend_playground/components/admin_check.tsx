import Link from "next/link";
import { isAuthenticated } from "../lib/auth";
import BaseLayout from "./base_layout";

interface Props {
  children: JSX.Element;
}

function AdminCheck(props: Props) {
  const admin_condition = 1;

  if (isAuthenticated() && isAuthenticated().user.role === admin_condition)
    return props.children;
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

export default AdminCheck;
