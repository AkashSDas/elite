import AdminCheck from "../../components/admin_check";
import UserDashboard from "../../components/user_dashboard";

function AdminDashboardPage() {
  return (
    <AdminCheck>
      <UserDashboard />
    </AdminCheck>
  );
}

export default AdminDashboardPage;
