import {
  ArrowLeft,
  ShieldX,
} from "lucide-react";

import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50/40 p-5">
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-10 text-center shadow-lg">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-red-500">
          <ShieldX size={42} />
        </div>

        <h1 className="font-primary text-3xl font-bold">
          Access Denied!
        </h1>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          You don't have permission to access this page.
          Only admin users are allowed.
        </p>

        <button
          onClick={() => navigate(ROUTES.LOGIN)}
          className="mx-auto mt-7 flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <ArrowLeft size={17} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;