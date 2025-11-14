import React, { useEffect, useState } from "react";

function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch Bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/customers/booking-status",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700 font-semibold text-lg">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-8 font-sans">
      <div className="border border-black rounded-3xl w-full max-w-5xl p-10 bg-white shadow-md">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center mb-8">
          Your Bookings
        </h1>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-black shadow-sm">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-black text-white uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold border-b border-gray-300">#</th>
                <th className="py-3 px-4 text-sm font-semibold border-b border-gray-300">
                  Vehicle Type
                </th>
                <th className="py-3 px-4 text-sm font-semibold border-b border-gray-300">
                  Service Type
                </th>
                <th className="py-3 px-4 text-sm font-semibold border-b border-gray-300">
                  Service Date
                </th>
                <th className="py-3 px-4 text-sm font-semibold border-b border-gray-300">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={booking.id || index}
                    className="hover:bg-gray-100 transition-all border-b border-gray-200"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 capitalize">
                      {booking.vehicleType || "N/A"}
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {booking.serviceType || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {booking.serviceDate
                        ? new Date(booking.serviceDate).toLocaleDateString(
                            "en-GB"
                          )
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                          booking.status === "Completed"
                            ? "text-green-700 border-green-600 bg-green-50"
                            : booking.status === "Pending"
                            ? "text-yellow-700 border-yellow-600 bg-yellow-50"
                            : "text-blue-700 border-blue-600 bg-blue-50"
                        }`}
                      >
                        {booking.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-gray-600 italic"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchBookings}
            className="border border-black rounded-full px-6 py-2 font-semibold hover:bg-black hover:text-white transition-all"
          >
            Refresh Bookings
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-600 text-center font-medium">
        © {new Date().getFullYear()} Vehicle Service Booking System |{" "}
        <span className="text-black font-semibold">Customer Panel</span>
      </footer>
    </div>
  );
}

export default ViewBooking;
