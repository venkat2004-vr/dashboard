import {
  Clock3,
  DollarSign,
  UserCheck,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "120",
      change: "+12.5%",
      icon: Users,
      iconStyle: "bg-green-100 text-green-600",
    },
    {
      title: "Active Users",
      value: "98",
      change: "+8.3%",
      icon: UserCheck,
      iconStyle: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Users",
      value: "22",
      change: "+5.2%",
      icon: Clock3,
      iconStyle: "bg-orange-100 text-orange-500",
    },
    {
      title: "Total Revenue",
      value: "$24,560",
      change: "+15.7%",
      icon: DollarSign,
      iconStyle: "bg-violet-100 text-violet-600",
    },
  ];

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      status: "Active",
      date: "May 20, 2024",
    },
    {
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "User",
      status: "Active",
      date: "May 19, 2024",
    },
    {
      name: "Arun Kumar",
      email: "arun@example.com",
      role: "User",
      status: "Pending",
      date: "May 19, 2024",
    },
    {
      name: "Neha Patel",
      email: "neha@example.com",
      role: "User",
      status: "Active",
      date: "May 18, 2024",
    },
    {
      name: "Rahul Verma",
      email: "rahul@example.com",
      role: "User",
      status: "Blocked",
      date: "May 17, 2024",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-orange-100 text-orange-700";

      case "Blocked":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-7">
        <h1 className="font-primary text-2xl font-bold text-text-primary md:text-3xl">
          Welcome back, Admin!
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Here's what's happening with your system today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                rounded-xl
                border
                border-border
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              <div
                className={`
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  ${stat.iconStyle}
                `}
              >
                <Icon size={21} />
              </div>

              <h2 className="text-2xl font-bold text-text-primary">
                {stat.value}
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                {stat.title}
              </p>

              <p className="mt-2 text-xs font-semibold text-primary">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Users */}
      <div className="mt-6 rounded-xl border border-border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-primary text-lg font-semibold">
            Recent Users
          </h2>

          <button
            className="
              rounded-lg
              border
              border-primary
              px-4
              py-2
              text-xs
              font-semibold
              text-primary
              transition
              hover:bg-primary
              hover:text-white
            "
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 text-xs font-semibold text-text-secondary">
                  Name
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-text-secondary">
                  Email
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-text-secondary">
                  Role
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-text-secondary">
                  Status
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-text-secondary">
                  Joined Date
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-border last:border-0 hover:bg-gray-50"
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
                        ${getStatusStyle(user.status)}
                      `}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {user.date}
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

export default Dashboard;