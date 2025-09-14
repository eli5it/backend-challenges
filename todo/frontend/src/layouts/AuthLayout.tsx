import { useAuth } from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router";

function AuthLayout() {
  const { data: user, isLoading, isError } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    navigate("/login");
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
}

export default AuthLayout;
