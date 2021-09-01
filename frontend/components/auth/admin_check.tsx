import { Typography } from "@material-ui/core";
import { isAuthenticated } from "../../lib/api/auth";

function AdminCheck({ children }: { children: JSX.Element }) {
  const admin_condition = 99;

  if (isAuthenticated() && isAuthenticated().user.role === admin_condition)
    return children;

  return (
    <Typography variant="h1">
      Access denied, you are not authorized to visit this page
    </Typography>
  );
}
