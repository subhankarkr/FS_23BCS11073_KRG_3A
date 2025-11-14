import { Link } from "react-router-dom";

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-black shadow-sm bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">
            Customer Dashboard
          </h1>
          <Link
            to="/login"
            className="border border-black rounded-full px-5 py-2 font-medium hover:bg-black hover:text-white transition"
          >
            Logout
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Welcome Back 👋
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Book Service */}
          <div className="border border-black rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white">
            <h2 className="text-xl font-semibold mb-2">
              <Link to="/booking" className="hover:underline">
                Book Service
              </Link>
            </h2>
            <p className="text-gray-600 text-sm">
              Schedule a new service appointment for your vehicle.
            </p>
          </div>

          {/* View Bookings */}
          <div className="border border-black rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white">
            <h2 className="text-xl font-semibold mb-2">
              <Link to="/view-bookings" className="hover:underline">
                View Bookings
              </Link>
            </h2>
            <p className="text-gray-600 text-sm">
              Check your booking history and current service status.
            </p>
          </div>

          {/* Profile */}
          <div className="border border-black rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white">
            <h2 className="text-xl font-semibold mb-2">
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </h2>
            <p className="text-gray-600 text-sm">
              View and update your personal information.
            </p>
          </div>

          {/* Logout */}
          <div className="border border-black rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white">
            <h2 className="text-xl font-semibold mb-2">
              <Link to="/login" className="hover:underline">
                Logout
              </Link>
            </h2>
            <p className="text-gray-600 text-sm">
              Securely log out and end your session.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black py-4 text-center text-gray-600 font-medium">
        © {new Date().getFullYear()} Vehicle Service Booking System |{" "}
        <span className="text-black font-semibold">Customer Panel</span>
      </footer>
    </div>
  );
}

export default CustomerDashboard;
