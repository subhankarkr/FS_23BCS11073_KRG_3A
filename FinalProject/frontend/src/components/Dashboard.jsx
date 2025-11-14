import CustomerDashboard from "./Customer/CustomerDashboard";
import MechanicDashboard from "./Mechanic/MechanicDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

function Dashboard() {
  const role = localStorage.getItem("role");

  const renderDashboard = () => {
    if (role === "CUSTOMER") {
      return <CustomerDashboard />;
    } else if (role === "MECHANIC") {
      return <MechanicDashboard />;
    } else if (role === "ADMIN") {
      return <AdminDashboard />;
    } else {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans">
          <div className="border border-black shadow-md rounded-3xl p-10 max-w-lg text-center bg-white">
            <h2 className="text-3xl font-bold mb-4">No Role Found</h2>
            <p className="text-gray-600 mb-8">
              Please log in again to access your dashboard.
            </p>
            <a
              href="/login"
              className="border border-black rounded-full px-6 py-2 font-medium hover:bg-black hover:text-white transition-all"
            >
              Go to Login
            </a>
          </div>
        </div>
      );
    }
  };

  return <div className="min-h-screen">{renderDashboard()}</div>;
}

export default Dashboard;
