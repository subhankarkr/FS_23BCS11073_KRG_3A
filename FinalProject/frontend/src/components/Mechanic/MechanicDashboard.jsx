import { Wrench, ClipboardList, User } from "lucide-react";
import { Link } from "react-router-dom";

function MechanicDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 font-sans">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-3">Mechanic Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Manage your jobs, updates, and profile — all in one place.
        </p>
      </header>

      {/* Navigation Cards */}
      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* View Assigned Jobs */}
        <Link
          to="/view-assigned-jobs"
          className="group border border-black rounded-3xl p-8 flex flex-col items-center justify-center hover:bg-black hover:text-white transition-all shadow-md"
        >
          <Wrench className="w-14 h-14 mb-4 text-black group-hover:text-white transition-all" />
          <h2 className="text-2xl font-semibold mb-2">View Assigned Jobs</h2>
          <p className="text-gray-600 text-sm text-center group-hover:text-gray-300">
            Check all service jobs assigned to you.
          </p>
        </Link>

        {/* Update Job Status */}
        <Link
          to="/update-job-status"
          className="group border border-black rounded-3xl p-8 flex flex-col items-center justify-center hover:bg-black hover:text-white transition-all shadow-md"
        >
          <ClipboardList className="w-14 h-14 mb-4 text-black group-hover:text-white transition-all" />
          <h2 className="text-2xl font-semibold mb-2">Update Job Status</h2>
          <p className="text-gray-600 text-sm text-center group-hover:text-gray-300">
            Update progress and mark completed repairs.
          </p>
        </Link>

        {/* View Profile */}
        <Link
          to="/mechanic-profile"
          className="group border border-black rounded-3xl p-8 flex flex-col items-center justify-center hover:bg-black hover:text-white transition-all shadow-md"
        >
          <User className="w-14 h-14 mb-4 text-black group-hover:text-white transition-all" />
          <h2 className="text-2xl font-semibold mb-2">View Profile</h2>
          <p className="text-gray-600 text-sm text-center group-hover:text-gray-300">
            View and manage your personal information.
          </p>
        </Link>
      </nav>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} Vehicle Service System |{" "}
        <span className="font-semibold text-black">Mechanic Panel</span>
      </footer>
    </div>
  );
}

export default MechanicDashboard;
