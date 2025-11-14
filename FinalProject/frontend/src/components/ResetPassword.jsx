import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, KeyRound } from "lucide-react";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        { token, newPassword: password }
      );
      setMessage("✅ " + response.data);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Something went wrong!"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans px-4">
      <div className="w-full max-w-md border border-black rounded-3xl p-10 bg-white shadow-md">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center mb-6 flex items-center justify-center gap-3">
          <KeyRound className="w-7 h-7 text-black" />
          Reset Password
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-500 hover:text-black transition"
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full border border-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition-all"
            >
              Reset Password
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-5 font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <a
            href="/login"
            className="text-sm text-gray-600 font-medium hover:text-black hover:underline transition"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
