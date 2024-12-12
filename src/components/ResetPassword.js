import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-center text-black mb-10">
        “Memory... is the diary that we all carry about with us.”
      </h1>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6">
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
              placeholder="Value"
              className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/login"
              className="text-gray-600 hover:underline focus:outline-none"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
