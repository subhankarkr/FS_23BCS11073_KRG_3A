import { useState, useEffect } from "react";
import { ClipboardList, Filter, CheckCircle } from "lucide-react";

function ManageJob() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in as admin to view jobs.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/admin/all-services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch jobs: ${response.status}`);

      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (jobId) => {
    const mechanicEmail = prompt("Enter mechanic email to assign this job:");
    if (!mechanicEmail) {
      alert("Mechanic email is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/admin/Manage-job-status/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(mechanicEmail),
        }
      );

      const message = await response.text();
      if (response.ok) {
        alert("✅ " + message);
        fetchJobs();
      } else {
        alert("❌ " + message);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Server error while updating job status.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter(
          (job) =>
            job.status &&
            job.status.toLowerCase() === statusFilter.toLowerCase()
        );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600 font-semibold";
      case "In Progress":
        return "text-blue-600 font-semibold";
      case "Completed":
        return "text-green-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-700 text-lg font-semibold">
        Loading jobs...
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
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <ClipboardList className="w-9 h-9 text-black" />
            <h1 className="text-4xl font-extrabold">Manage Jobs</h1>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-black rounded-full px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </header>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-black shadow-sm bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm border-b border-black">
              <tr>
                <th className="py-3 px-4 font-semibold">Job ID</th>
                <th className="py-3 px-4 font-semibold">Customer ID</th>
                <th className="py-3 px-4 font-semibold">Vehicle Type</th>
                <th className="py-3 px-4 font-semibold">Service Type</th>
                <th className="py-3 px-4 font-semibold">Description</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Service Date</th>
                <th className="py-3 px-4 font-semibold">Mechanic</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-300 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      #{job.id}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {job.customerId || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {job.vehicleType || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {job.serviceType || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                      {job.description || "N/A"}
                    </td>
                    <td className={`py-3 px-4 ${getStatusColor(job.status)}`}>
                      {job.status || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {job.serviceDate
                        ? new Date(job.serviceDate).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {job.assignedMechanicEmail || (
                        <span className="italic text-gray-500">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => updateJobStatus(job.id)}
                        className="border border-black rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 mx-auto"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Assign
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No jobs found for the selected status.
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

export default ManageJob;
