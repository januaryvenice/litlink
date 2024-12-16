import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false, // Tracks login state
  username: "", // Tracks the logged-in user's username
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }), // Method to update login state
  setUsername: (username) => set({ username }), // Method to update username
  logout: () => set({ isLoggedIn: false, username: "" }), // Method to log out
}));

export default useAuthStore;
