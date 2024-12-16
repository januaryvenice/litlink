import React, { useEffect, useState } from "react";
import { fetchUserDetails, uploadProfilePicture } from "../services/api";
import axios from "axios";
import editIcon from "../images/edit.jpg"; // Correct path for the edit icon
import defaultPfp from "../images/pfp.jpg"; // Correct path for the default profile picture
import useAuthStore from "../authStore";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useAuthStore();
  const userId = localStorage.getItem("userId");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await fetchUserDetails(userId, token);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setErrorMessage("Failed to load user data.");
      }
    };

    if (isLoggedIn && userId) {
      fetchUserData();
    }
  }, [isLoggedIn, userId]);

  // Handle profile picture upload
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const token = localStorage.getItem("token");
      const { data } = await uploadProfilePicture(userId, formData, token);
      setUserData((prev) => ({ ...prev, ProfilePicture: data.imageUrl }));
      setPreviewImage(null);
      setSelectedImage(null);
      setSuccessMessage("Profile picture updated successfully!");
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      setErrorMessage("Failed to upload profile picture.");
    }
  };

  // Handle saving field updates
  const handleSaveChanges = async (field) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/users/update-field",
        { userId, field, value: updatedValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserData((prev) => ({ ...prev, [field]: updatedValue }));
      setEditingField(null);
      setSuccessMessage(`${field} updated successfully!`);
    } catch (error) {
      console.error("Failed to update field:", error);
      setErrorMessage("Failed to update field.");
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          {/* Display profile picture */}
          <img
            src={
              previewImage || userData.ProfilePicture || defaultPfp
            } // Default to pfp.jpg if ProfilePicture is null
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="mt-4">
            <label className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }}
                className="hidden"
              />
            </label>
            {selectedImage && (
              <button
                onClick={handleImageUpload}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Upload
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {["FirstName", "LastName", "Email", "Password"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-lg font-medium text-gray-700">{field}</label>
              {editingField === field ? (
                <div className="flex space-x-2">
                  <input
                    type={field === "Password" ? "password" : "text"}
                    value={updatedValue}
                    onChange={(e) => setUpdatedValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                  />
                  <button
                    onClick={() => handleSaveChanges(field)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingField(null)}
                    className="text-black underline cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span>{field === "Password" ? "********" : userData[field]}</span>
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      setEditingField(field);
                      setUpdatedValue(userData[field]);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>


        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Account;
