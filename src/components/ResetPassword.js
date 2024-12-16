import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [step, setStep] = useState(1); // Tracks which step the user is on
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/users/check-email", {
        email: formData.email,
      });
      setSuccess(response.data.message);
      setStep(2); // Move to step 2
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleNameValidation = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/users/validate-name", {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setSuccess(response.data.message);
      setStep(3); // Move to step 3
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/reset-password", {
        email: formData.email,
        password: formData.password,
      });
      setSuccess(response.data.message);
      setStep(4); // Final step
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-black mb-10">Reset Password</h1>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button
              type="submit"
              className="w-full px-5 py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
            >
              Submit
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNameValidation} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button
              type="submit"
              className="w-full px-5 py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
            >
              Validate
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
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
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button
              type="submit"
              className="w-full px-5 py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
            >
              Reset Password
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="text-center">
            <p className="text-green-500">Your password has been reset successfully!</p>
            <p>
              <a href="/login" className="text-purple-600 hover:underline">
                Go to Login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
