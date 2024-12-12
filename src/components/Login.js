import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-black mb-10">
        Start Your Chapter. Build Your Community.
      </h1>

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-8">
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
              placeholder="Value"
              className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
