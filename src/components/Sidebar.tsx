import {
  LayoutDashboard,
  Users,
  ChartNoAxesColumnIncreasing,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      name: "Users",
      icon: Users,
      path: ROUTES.USERS,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside
      className="
        hidden
        min-h-screen
        w-[240px]
        shrink-0
        flex-col
        bg-sidebar
        px-4
        py-5
        text-white
        lg:flex
      "
    >
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <ShieldCheck size={20} />
        </div>

        <div>
          <h1 className="font-primary text-base font-semibold">
            Admin
          </h1>

          <p className="text-xs text-gray-400">
            Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-3
                text-sm
                transition
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-sidebar-hover hover:text-white"
                }
                `
              }
            >
              <Icon size={19} />

              <span>
                {item.name}
              </span>
            </NavLink>
          );
        })}

        {/* UI-only menu items */}
        <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-sidebar-hover hover:text-white">
          <ChartNoAxesColumnIncreasing size={19} />
          Analytics
        </button>

        <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-sidebar-hover hover:text-white">
          <ShoppingCart size={19} />
          Orders
        </button>

        <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-sidebar-hover hover:text-white">
          <FileText size={19} />
          Reports
        </button>

        <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-sidebar-hover hover:text-white">
          <Settings size={19} />
          Settings
        </button>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          flex
          items-center
          gap-3
          rounded-lg
          px-3
          py-3
          text-sm
          text-gray-300
          transition
          hover:bg-red-500/10
          hover:text-red-400
        "
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;