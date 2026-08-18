import { Navigate, Outlet } from "react-router";
import { ROUTES } from "../constants/routes";

interface User {
  username: string;
  role: string;
}

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storedUser = localStorage.getItem("user");

  // Not logged in
  if (!isLoggedIn || !storedUser) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  const user: User = JSON.parse(storedUser);

  // Logged in but not admin
  if (user.role !== "admin") {
    return (
      <Navigate
        to={ROUTES.ACCESS_DENIED}
        replace
      />
    );
  }

  // Logged in + admin
  return <Outlet />;
};

export default ProtectedRoute;