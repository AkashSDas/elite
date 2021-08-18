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
      <main>You cannot perform the following task as you not an admin</main>
    </BaseLayout>
  );
}

export default AdminCheck;
