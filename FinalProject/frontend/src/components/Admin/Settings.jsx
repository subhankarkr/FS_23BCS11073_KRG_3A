import { useEffect, useState } from "react";
import { User, Mail, Shield, Clock } from "lucide-react";

function Settings() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch admin profile
  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in as an Admin.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/admin/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to load admin profile");

      const data = await response.json();
      setAdmin(data);
    } catch (err) {
      console.error("Error fetching admin profile:", err);
      setError("Failed to load admin profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg font-semibold bg-white">
        Loading admin profile...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg font-medium bg-white">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="border-b border-black shadow-sm bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-black" />
            Admin Profile
          </h1>
          <a
            href="/admin-dashboard"
            className="border border-black rounded-full px-5 py-2 font-medium hover:bg-black hover:text-white transition"
          >
            Back to Dashboard
          </a>
        </div>
      </header>

      {/* Profile Section */}
      <main className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl border border-black rounded-3xl p-10 shadow-md bg-white">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold mb-3 flex items-center justify-center gap-3">
              <User className="w-8 h-8 text-black" />
              Admin Details
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              View and verify your account information
            </p>
          </header>

          {/* Profile Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={admin?.fullName || "N/A"}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl border border-black focus:outline-none bg-gray-50 cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={admin?.email || "N/A"}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl border border-black focus:outline-none bg-gray-50 cursor-not-allowed"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Role
              </label>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black bg-gray-50">
                <Shield className="text-black w-5 h-5" />
                <span className="font-medium">{admin?.role || "N/A"}</span>
              </div>
            </div>

            {/* Account Created */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Account Created
              </label>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black bg-gray-50">
                <Clock className="text-black w-5 h-5" />
                <span>
                  {admin?.createdAt
                    ? new Date(admin.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black py-4 text-center text-gray-600 font-medium">
        © {new Date().getFullYear()} Vehicle Service System |{" "}
        <span className="text-black font-semibold">Admin Panel</span>
      </footer>
    </div>
  );
}

export default Settings;
