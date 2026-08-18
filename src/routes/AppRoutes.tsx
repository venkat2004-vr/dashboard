import { Navigate, Route, Routes } from "react-router";

import { ROUTES } from "../constants/routes";

import Login from "../pages/auth/Login";
import AccessDenied from "../pages/auth/AccessDenied";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layouts/Layout";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={<Login />}
      />

      <Route
        path={ROUTES.ACCESS_DENIED}
        element={<AccessDenied />}
      />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>

          <Route
            path={ROUTES.DASHBOARD}
            element={<Dashboard />}
          />

          <Route
            path={ROUTES.USERS}
            element={<Users />}
          />

        </Route>

      </Route>

      {/* Not Found */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={
          <Navigate
            to={ROUTES.LOGIN}
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;