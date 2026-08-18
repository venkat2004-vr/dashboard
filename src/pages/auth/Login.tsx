import { useState, type FormEvent } from "react";
import { LockKeyhole, ShieldCheck, User } from "lucide-react";
import { useNavigate } from "react-router";

import { ROUTES } from "../../constants/routes";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Only Admin Login
    if (username === "admin" && password === "admin123") {
      const admin = {
        username: "admin",
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(admin));
      localStorage.setItem("isLoggedIn", "true");

      navigate(ROUTES.DASHBOARD, {
        replace: true,
      });

      return;
    }

    // Invalid credentials
    alert("Invalid admin username or password");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50/40 p-5">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-xl md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden items-center justify-center bg-green-50 p-10 md:flex">
          <div className="text-center">
            {/* Shield */}
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
              <ShieldCheck size={42} />
            </div>

            {/* Title */}
            <h1 className="font-primary text-3xl font-bold">
              Admin Panel
            </h1>

            {/* Description */}
            <p className="mt-2 text-sm text-text-secondary">
              Secure administration dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-7 sm:p-10">
          <h2 className="font-primary text-2xl font-bold">
            Welcome Back!
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Sign in to your admin account
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium"
              >
                Username
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="Enter username"
                  autoComplete="username"
                  className="w-full rounded-lg border border-border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-text-secondary">
            Only admin users can access this panel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;