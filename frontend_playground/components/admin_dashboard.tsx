import { isAuthenticated } from "../lib/auth";
import BaseLayout from "./base_layout";
import Link from "next/link";

function AdminDashboard() {
  const {
    user: { username, email, role },
  } = isAuthenticated();

  const actionItem = (href: string, text: string) => (
    <li className="list-group-item">
      <Link href={href}>
        <a className="nav-link text-success">{text}</a>
      </Link>
    </li>
  );

  const leftSection = () => (
    <div className="card">
      <h4 className="card-header bg-dark text-white">Admin Naivation</h4>
      <ul className="list-group">
        {actionItem("/dashboard/admin/category/create", "Create category")}
        {actionItem("/dashboard/admin/product/create", "Create product")}
        {actionItem("/dashboard/admin/product", "Manage products")}
        {actionItem("/dashboard/admin/order", "Manage orders")}
      </ul>
    </div>
  );

  const rightSection = () => (
    <div className="card mb-4">
      <h4 className="card-header">Admin information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Username</span>: {username}
        </li>
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Email</span>: {email}
        </li>
        <li className="list-group-item">
          <span className="badge bg-danger mr-2">Admin area</span>
        </li>
      </ul>
    </div>
  );

  return (
    <BaseLayout
      title="Admin dashboard page"
      description="Manage all products from here"
      className="container bg-success p-5"
    >
      <main>
        <h1>Admin Control</h1>
        <div className="row">
          <div className="col-3">{leftSection()}</div>
          <div className="col-9">{rightSection()}</div>
        </div>
      </main>
    </BaseLayout>
  );
}

export default AdminDashboard;
