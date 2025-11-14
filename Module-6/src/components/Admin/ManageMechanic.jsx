import { useEffect, useState } from "react";
import { Wrench, User } from "lucide-react";

function ManageMechanic() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch mechanics
  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in as admin to view mechanics.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/admin/all-mechanics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setMechanics(data);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
      setError("Failed to load mechanics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-700 text-lg font-semibold">
        Loading mechanics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-red-600 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans">
      <div className="max-w-7xl mx-auto border border-black rounded-3xl shadow-md p-10 bg-white">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3 flex items-center justify-center gap-3">
            <Wrench className="w-8 h-8 text-black" />
            Manage Mechanics
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            View and manage all registered mechanics in the system.
          </p>
        </header>

        {/* Mechanics Table */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <User className="w-6 h-6 text-black" /> Mechanics List
            </h2>
            <p className="text-sm text-gray-600">
              Total Mechanics:{" "}
              <span className="font-semibold text-black">{mechanics.length}</span>
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black shadow-sm bg-white">
            {mechanics.length === 0 ? (
              <p className="text-center text-gray-500 italic py-6">
                No mechanics found.
              </p>
            ) : (
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wide border-b border-black">
                  <tr>
                    <th className="py-3 px-4 font-semibold">ID</th>
                    <th className="py-3 px-4 font-semibold">Full Name</th>
                    <th className="py-3 px-4 font-semibold">Email</th>
                    <th className="py-3 px-4 font-semibold">Role</th>
                    <th className="py-3 px-4 font-semibold">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {mechanics.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-medium text-gray-800">#{m.id}</td>
                      <td className="py-3 px-4 text-gray-900">{m.fullName || "N/A"}</td>
                      <td className="py-3 px-4 text-gray-700">{m.email}</td>
                      <td className="py-3 px-4 text-gray-700 font-medium">
                        {m.role || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-sm text-gray-600 text-center font-medium">
          © {new Date().getFullYear()} Vehicle Service System |{" "}
          <span className="text-black font-semibold">Admin Panel</span>
        </footer>
      </div>
    </div>
  );
}

export default ManageMechanic;
