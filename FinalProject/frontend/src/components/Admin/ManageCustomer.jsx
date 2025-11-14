import { useState, useEffect } from "react";
import { Search, Users } from "lucide-react";

function ManageCustomer() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch all customers
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in as admin to view customers.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/admin/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch customers: ${response.status}`);

      const data = await response.json();
      const onlyCustomers = data.filter((user) => user.role === "CUSTOMER");
      setCustomers(onlyCustomers);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      (c.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-700 text-lg font-semibold">
        Loading customers...
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
        <header className="flex flex-col sm:flex-row items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold mb-4 sm:mb-0 flex items-center gap-3">
            <Users className="w-8 h-8 text-black" />
            Manage Customers
          </h1>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-11 pr-4 py-2.5 border border-black rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-black shadow-sm bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm border-b border-black">
              <tr>
                <th className="py-3 px-4 font-semibold">#</th>
                <th className="py-3 px-4 font-semibold">Full Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Created At</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-300 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {customer.fullName || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{customer.email}</td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      {customer.role}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(customer.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No customers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-sm text-gray-600 text-center font-medium">
          © {new Date().getFullYear()} Vehicle Service System |{" "}
          <span className="text-black font-semibold">Admin Panel</span>
        </footer>
      </div>
    </div>
  );
}

export default ManageCustomer;
