import { useState, useEffect } from "react";
import { Wrench, ClipboardCheck, CheckCircle2, Loader2 } from "lucide-react";

function UpdateJobStatus() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch assigned jobs when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("⚠️ Please log in again.");
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

        if (!res.ok) throw new Error("Failed to fetch assigned jobs");

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Error fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle job status update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJobId || !status) {
      setMessage("⚠️ Please select a job and status before submitting.");
      return;
    }

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/api/mechanics/update-job-status/${selectedJobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to update status");
      }

      setMessage("✅ Job status updated successfully!");
      setStatus("");
      setSelectedJobId("");

      // Refresh jobs list
      const updatedJobs = await fetch(
        "http://localhost:8080/api/mechanics/assigned-jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newData = await updatedJobs.json();
      setJobs(newData);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("❌ Failed to update job status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-lg font-semibold">Loading assigned jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-8 font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <ClipboardCheck className="w-8 h-8 text-black" />
          Update Job Status
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Select a job and update its progress below.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-black rounded-3xl p-8 w-full max-w-lg shadow-lg hover:shadow-xl transition-all">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Job
            </label>
            <div className="flex items-center border border-black rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-black">
              <Wrench className="text-black mr-2" />
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full outline-none bg-transparent text-black"
              >
                <option value="">-- Choose a Job --</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {`${job.vehicleType.toUpperCase()} - ${job.serviceType} (${job.status})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Job Status
            </label>
            <div className="flex items-center border border-black rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-black">
              <Loader2 className="text-black mr-2" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full outline-none bg-transparent text-black"
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updating}
            className={`w-full bg-black text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:bg-gray-900 ${
              updating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {updating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Updating...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Update Status
              </>
            )}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-6 text-center font-medium border rounded-lg p-3 ${
              message.startsWith("✅")
                ? "border-green-400 text-green-600 bg-green-50"
                : "border-red-400 text-red-600 bg-red-50"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-gray-700 text-center">
        © {new Date().getFullYear()} Vehicle Service System |{" "}
        <span className="font-semibold text-black">Mechanic Portal</span>
      </div>
    </div>
  );
}

export default UpdateJobStatus;
