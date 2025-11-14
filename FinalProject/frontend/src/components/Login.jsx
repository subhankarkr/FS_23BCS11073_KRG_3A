import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Login failed: " + (err.response?.data || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans">
      <div className="w-full max-w-md border border-black rounded-3xl p-10 bg-white shadow-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <LogIn className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-extrabold">Sign In</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Welcome back to Vehicle Service System 🚗
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
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

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
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

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full border border-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition-all"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Extra Links */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <a
            href="/ForgetPassword"
            className="block text-gray-600 font-medium hover:text-black hover:underline transition mb-2"
          >
            Forgot Password?
          </a>
          <p>
            Don’t have an account?{" "}
            <a href="/Signup" className="text-black font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
