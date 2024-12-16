import axios from "axios";

// Axios instance configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
});

// ------------------- User APIs -------------------

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
export const deleteAccount = (userId, token) =>
  API.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Request to become an author
export const requestAuthor = (userId, token) =>
  API.post(
    "/users/request-author",
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// ------------------- Book APIs -------------------

// Fetch all books
export const fetchBooks = () => API.get("/books");

// Fetch books by category
export const fetchBooksByCategory = (category) =>
  API.get(`/books/category/${category}`);

// Upload a new book
export const publishBook = (formData, token) =>
  API.post("/books/publish", formData, {
    headers: {
      Authorization: `Bearer ${token}`, // Ensure token is passed
      "Content-Type": "multipart/form-data",
    },
  });




// Delete a book (Admin/Author only)
export const deleteBook = (bookId, token) =>
  API.delete(`/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ------------------- Booklist Helpers -------------------

// Fetch books with search term or category
export const searchBooks = (query) =>
  API.get(`/books/search${query ? `?search=${encodeURIComponent(query)}` : ""}`);
