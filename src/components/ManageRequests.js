import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(data);
      } catch (error) {
        setErrorMessage("Failed to load requests.");
      }
    };

    fetchRequests();
  }, []);

  const handleDecision = async (requestId, decision) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/requests/${requestId}`,
        { status: decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage(`Request ${decision.toLowerCase()}ed successfully!`);
      setRequests((prev) => prev.filter((req) => req.RequestID !== requestId));
    } catch (error) {
      setErrorMessage("Failed to update request.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mt-12 mb-8">
        Manage Author Requests
      </h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <div className="w-full max-w-4xl">
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.RequestID}
                className="p-4 bg-white rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {request.Username} ({request.Email})
                  </h3>
                  <p className="text-sm text-gray-500">
                    Requested on: {new Date(request.RequestDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDecision(request.RequestID, "Approved")}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(request.RequestID, "Rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;
