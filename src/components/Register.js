import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { username, firstName, lastName, email, password } = formData;
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { username, firstName, lastName, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(response.data.message || "Registration Complete!");
      setTimeout(() => navigate("/login"), 5000); // Redirect after 5 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10"> {/* Added padding */}
      <h1 className="text-3xl font-bold text-black mb-10">
        Start Your Chapter. Build Your Community.
      </h1>

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Password */}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Error/Success Messages */}
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">
              {success} Redirecting to login...
            </p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </button>
          </div>
        </form>

        {/* Already Registered? */}
        <div className="text-center mt-6">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
