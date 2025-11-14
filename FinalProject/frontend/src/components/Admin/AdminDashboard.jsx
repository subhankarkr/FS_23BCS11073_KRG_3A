import { Users, Wrench, ClipboardList, Settings, LogOut } from "lucide-react";

function AdminDashboard() {
  const cards = [
    {
      icon: <Wrench className="w-12 h-12 mb-4 text-black" />,
      title: "Manage Mechanics",
      desc: "View, edit, or remove mechanics and assign service jobs.",
      href: "/admin/mechanics",
    },
    {
      icon: <Users className="w-12 h-12 mb-4 text-black" />,
      title: "Manage Customers",
      desc: "Access customer records and booking details.",
      href: "/admin/customers",
    },
    {
      icon: <ClipboardList className="w-12 h-12 mb-4 text-black" />,
      title: "Manage Jobs",
      desc: "Track job assignments, progress, and service reports.",
      href: "/admin/jobs",
    },
    {
      icon: <Settings className="w-12 h-12 mb-4 text-black" />,
      title: "Profile & Settings",
      desc: "Update admin details and system preferences.",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full border-b border-black py-4 px-8 flex justify-between items-center shadow-sm bg-white">
        <h1 className="text-2xl font-bold tracking-wide">🚗 Vehicle Service Admin</h1>

        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>

      {/* Header Section */}
      <header className="text-center my-12">
        <h1 className="text-4xl font-extrabold mb-3">Welcome, Admin 👋</h1>
        <p className="text-gray-600 text-lg">
          Manage users, jobs, and system settings — all in one place.
        </p>
      </header>

      {/* Dashboard Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mx-auto p-6">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.href}
            className="border border-black rounded-3xl shadow-md hover:shadow-lg bg-white hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center p-10"
          >
            {card.icon}
            <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600 text-sm">{card.desc}</p>
          </a>
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-16 mb-6 text-sm text-gray-600 text-center font-medium">
        © {new Date().getFullYear()} Vehicle Service System |{" "}
        <span className="text-black font-semibold">Admin Panel</span>
      </footer>
    </div>
  );
}

export default AdminDashboard;
