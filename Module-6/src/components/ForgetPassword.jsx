import { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email,
      });
      setMessage("✅ Reset link sent! Please check your email.");
    } catch (err) {
      setMessage(err.response?.data || "❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans">
      <div className="w-full max-w-md border border-black rounded-3xl p-10 bg-white shadow-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Mail className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-extrabold">Forgot Password</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Enter your registered email to receive a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full border border-black rounded-full py-3 font-semibold hover:bg-black hover:text-white transition-all"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm mt-5 font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="/login"
            className="text-sm text-gray-600 font-medium hover:text-black hover:underline transition"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
