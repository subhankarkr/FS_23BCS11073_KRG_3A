import React, { useState } from "react";

function Booking() {
  const [formData, setFormData] = useState({
    vehicleType: "",
    serviceDate: "",
    serviceType: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("⚠️ Please log in to book a service.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/customers/book-service",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Service booked successfully!");
        setFormData({
          vehicleType: "",
          serviceDate: "",
          serviceType: "",
          description: "",
        });
      } else {
        setMessage(`❌ ${data.message || data}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error! Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-black shadow-sm bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vehicle Service Booking</h1>
          <a
            href="/customer-dashboard"
            className="border border-black rounded-full px-5 py-2 font-medium hover:bg-black hover:text-white transition"
          >
            Back to Dashboard
          </a>
        </div>
      </header>

      {/* Booking Form */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="border border-black rounded-3xl shadow-md p-10 w-full max-w-lg bg-white">
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            Book Your Service
          </h2>

          {message && (
            <div
              className={`text-center mb-6 font-medium p-3 rounded-lg border ${
                message.startsWith("✅")
                  ? "text-green-700 border-green-600 bg-green-50"
                  : message.startsWith("⚠️")
                  ? "text-yellow-700 border-yellow-600 bg-yellow-50"
                  : "text-red-700 border-red-600 bg-red-50"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Vehicle Type
              </label>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="e.g., Sedan, SUV, Bike"
                className="w-full border border-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 transition"
              />
            </div>

            {/* Service Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Service Date
              </label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                className="w-full border border-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 transition"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Service Type
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full border border-black rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="">-- Select Service --</option>
                <option value="oilChange">Oil Change</option>
                <option value="tireRotation">Tire Rotation</option>
                <option value="brakeInspection">Brake Inspection</option>
                <option value="generalMaintenance">General Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write any specific concerns or requirements..."
                className="w-full border border-black rounded-xl px-4 py-3 h-28 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 transition resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full border border-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition-all"
              >
                Book Service
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black py-4 text-center text-gray-600 font-medium">
        © {new Date().getFullYear()} Vehicle Service System |{" "}
        <span className="text-black font-semibold">Customer Panel</span>
      </footer>
    </div>
  );
}

export default Booking;
