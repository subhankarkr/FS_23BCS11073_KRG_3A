import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Shield, Clock } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in again.");
          return;
        }
        axios.defaults.withCredentials = true;

        const response = await axios.get(
          "http://localhost:8080/api/customers/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please log in again.");
      }
    };

    fetchProfile();
  }, []);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold bg-white">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-white">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-black shadow-sm bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-black" />
            Profile
          </h1>
          <a
            href="/customer-dashboard"
            className="border border-black rounded-full px-5 py-2 font-medium hover:bg-black hover:text-white transition"
          >
            Back to Dashboard
          </a>
        </div>
      </header>

      {/* Profile Card */}
      <main className="flex-grow flex justify-center items-center px-6 py-12">
        <div className="border border-black rounded-3xl shadow-md p-10 w-full max-w-md bg-white">
          <div className="flex flex-col items-center">
            <img
              src="https://avatars.githubusercontent.com/u/9919?v=4"
              alt="User avatar"
              className="w-24 h-24 rounded-full border border-black mb-4 shadow-sm"
            />
            <h2 className="text-2xl font-semibold mb-1">
              {user.fullName || "Unknown User"}
            </h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>

          {/* Details */}
          <div className="mt-6 border-t border-gray-300 pt-4 space-y-4">
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-medium flex items-center gap-2">
                <Shield className="w-5 h-5 text-black" /> Role
              </span>
              <span className="font-semibold">{user.role}</span>
            </div>

            <div className="flex justify-between items-center text-gray-800">
              <span className="font-medium flex items-center gap-2">
                <Clock className="w-5 h-5 text-black" /> Joined On
              </span>
              <span>
                {new Date(user.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 text-center">
            <button className="border border-black rounded-full px-6 py-2 font-semibold hover:bg-black hover:text-white transition">
              Edit Profile
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black py-4 text-center text-gray-600 font-medium">
        © {new Date().getFullYear()} Vehicle Service Booking System |{" "}
        <span className="text-black font-semibold">Customer Panel</span>
      </footer>
    </div>
  );
}

export default Profile;
