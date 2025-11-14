import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "CUSTOMER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/signup", form);
      alert("✅ Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("❌ Signup failed: " + (err.response?.data || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans">
      <div className="w-full max-w-md border border-black rounded-3xl p-10 bg-white shadow-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <UserPlus className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-extrabold">Create Account</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Start your journey with Vehicle Service System 🚗
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-black transition"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="MECHANIC">Mechanic</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full border border-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition-all"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-black font-semibold hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
