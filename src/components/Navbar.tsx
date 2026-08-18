import {
  Bell,
  Menu,
  Search,
  UserRound,
} from "lucide-react";

const Navbar = () => {
  return (
    <header
      className="
        flex
        h-[72px]
        items-center
        justify-between
        border-b
        border-border
        bg-white
        px-6
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <Menu
            size={21}
            className="text-gray-600"
          />
        </button>

        <h2 className="font-primary text-lg font-semibold text-text-primary">
          Admin Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hidden rounded-lg p-2 transition hover:bg-gray-100 sm:block">
          <Search
            size={20}
            className="text-gray-600"
          />
        </button>

        <button className="relative rounded-lg p-2 transition hover:bg-gray-100">
          <Bell
            size={20}
            className="text-gray-600"
          />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        <div className="ml-1 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <UserRound
              size={20}
              className="text-gray-600"
            />
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-text-primary">
              Admin
            </p>

            <p className="text-xs text-text-secondary">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;