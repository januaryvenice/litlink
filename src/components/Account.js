import React from "react";

const Account = () => {
  return (
    <div className="bg-white py-8 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Your Account</h2>
      
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          {/* Placeholder for profile picture */}
          <span className="text-gray-400">Image</span>
        </div>
        <div className="flex space-x-4">
          <button className="bg-black text-white py-2 px-4 rounded">Upload New Picture</button>
          <button className="bg-gray-300 text-black py-2 px-4 rounded">Delete</button>
        </div>
      </div>
      
      {/* Form Section */}
      <form>
        {/* Full Name */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Full Name</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
        </div>
        
        {/* Contact Email */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Contact Email</h3>
          <div className="flex items-center gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
            <button className="bg-black text-white py-2 px-4 rounded">Add Another Email</button>
          </div>
        </div>
        
        {/* Password */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
            <input
              type="password"
              placeholder="New Password"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
        </div>
        
        {/* Save Changes Button */}
        <div className="text-center">
          <button className="bg-black text-white py-3 px-6 rounded">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default Account;
