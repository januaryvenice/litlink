import axios from "axios";

//testing commit
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
});

// Login
export const login = (email, password) =>
  API.post("/users/login", { email, password });

// Register
export const register = (userData) =>
  API.post("/users/register", userData);

// Check if email exists
export const checkEmail = (email) => API.post("/users/check-email", { email });

// Validate first name and last name
export const validateName = (email, firstName, lastName) =>
  API.post("/users/validate-name", { email, firstName, lastName });

// Reset password
export const resetPassword = (email, password) =>
  API.post("/users/reset-password", { email, password });

// Fetch user details
export const fetchUserDetails = (userId, token) =>
  API.get(`/users/details/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Upload profile picture
export const uploadProfilePicture = (userId, formData, token) =>
  API.post(`/users/upload-profile/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });


  // Delete account
export const deleteAccount = (userId, token) => {
  return API.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Request to become an author
export const requestAuthor = (userId, token) => {
  return API.post(
    "/users/request-author",
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};