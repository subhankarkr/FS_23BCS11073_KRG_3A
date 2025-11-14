import { useEffect, useState } from "react";
import { Wrench, Calendar, MapPin, Clock, CheckCircle } from "lucide-react";

function ViewAssignedJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found — please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "http://localhost:8080/api/mechanics/assigned-jobs",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch assigned jobs");
        }

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "border-yellow-500 text-yellow-600 bg-yellow-50";
      case "In Progress":
        return "border-blue-500 text-blue-600 bg-blue-50";
      case "Completed":
        return "border-green-500 text-green-600 bg-green-50";
      default:
        return "border-gray-400 text-gray-600 bg-gray-50";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-lg font-semibold">Loading assigned jobs...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-lg font-semibold">No assigned jobs found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Assigned Jobs</h1>
        <p className="text-gray-600 text-lg">
          Track your current and upcoming repair tasks.
        </p>
      </div>

      {/* Job Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-black rounded-3xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center mb-4">
              <Wrench className="text-black w-8 h-8 mr-3" />
              <h2 className="text-xl font-semibold capitalize">{job.vehicleType}</h2>
            </div>

            <p className="text-gray-700 mb-2">
              <strong>Service:</strong>{" "}
              {job.serviceType.replace(/([A-Z])/g, " $1")}
            </p>

            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {job.description}
            </p>

            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-2 text-black" />
              Service Bay (auto-assigned)
            </div>

            <div className="flex items-center text-gray-600 text-sm mb-2">
              <Calendar className="w-4 h-4 mr-2 text-black" />
              {job.serviceDate}
            </div>

            <div className="flex items-center text-gray-600 text-sm mb-4">
              <Clock className="w-4 h-4 mr-2 text-black" />
              10:00 AM (approx)
            </div>

            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
                job.status
              )}`}
            >
              {job.status === "Completed" && (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )}
              {job.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-sm text-gray-700">
        © {new Date().getFullYear()} Vehicle Service System |{" "}
        <span className="font-semibold text-black">Mechanic Panel</span>
      </div>
    </div>
  );
}

export default ViewAssignedJob;
