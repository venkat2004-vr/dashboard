import {
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import Button from "../../components/Button";

const Users = () => {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      status: "Active",
    },
    {
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "User",
      status: "Active",
    },
    {
      name: "Arun Kumar",
      email: "arun@example.com",
      role: "User",
      status: "Pending",
    },
    {
      name: "Neha Patel",
      email: "neha@example.com",
      role: "User",
      status: "Active",
    },
    {
      name: "Rahul Verma",
      email: "rahul@example.com",
      role: "User",
      status: "Blocked",
    },
  ];

  return (
    <div>
      {/* Heading */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-primary text-2xl font-bold">
            All Users
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Manage all registered users.
          </p>
        </div>

        <Button className="flex items-center justify-center gap-2">
          <Plus size={17} />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="mb-5 rounded-xl border border-border bg-white p-4">
        <div className="relative max-w-lg">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            className="
              w-full
              rounded-lg
              border
              border-border
              py-2.5
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-green-100
            "
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-5 py-4 text-xs font-semibold text-text-secondary">
                  Name
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-text-secondary">
                  Email
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-text-secondary">
                  Role
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-text-secondary">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="border-t border-border hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-sm font-medium">
                    {user.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {user.role}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "Pending"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-600"
                        }
                      `}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                        <Eye size={17} />
                      </button>

                      <button className="rounded-md p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600">
                        <Pencil size={17} />
                      </button>

                      <button className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;