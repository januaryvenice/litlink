import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";
import { login } from "../services/api"; // Import API call

const Login = () => {
  const { setLoggedIn, setUsername } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await login(email, password); // Call backend API
      localStorage.setItem("userId", data.user.userId); // Save userId to localStorage
      localStorage.setItem("token", data.token); // Save JWT token to localStorage
      setLoggedIn(true); // Update login state
      setUsername(data.user.username); // Set username
      setLoading(false);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-black mb-10">
        Start Your Chapter. Build Your Community.
      </h1>

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-blue-500">Loading...</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-gray-800"
            >
              Sign In
            </button>
          </div>

          <div className="text-md text-center">
            <Link to="/reset-password" className="text-purple-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>

        <div className="text-md text-center mt-8">
          <p>
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
