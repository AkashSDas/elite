import Link from "next/link";
import { isAuthenticated } from "../lib/auth";

interface Props {
  children: JSX.Element;
}

function AdminCheck(props: Props) {
  const admin_condition = 1;

  if (isAuthenticated() && isAuthenticated().user.role === admin_condition)
    return props.children;
  return (
    <main>
      You are not authenticated. To login{" "}
      <Link href="/signin">
        <a>click here</a>
      </Link>
    </main>
  );
}

export default AdminCheck;
