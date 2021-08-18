import AuthCheck from "../../components/auth_check";
import UserDashboard from "../../components/user_dashboard";

function UserDashboardPage() {
  return (
    <AuthCheck>
      <UserDashboard />
    </AuthCheck>
  );
}

export default UserDashboardPage;
