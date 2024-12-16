const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const userRoutes = require("./routes/userRoutes"); // User routes for user functionalities
const bookRoutes = require("./routes/bookRoutes"); // Book routes for book functionalities
const db = require("./config/db"); // Database connection

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------- Middleware -------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve static files for uploads and default images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "../src/images")));

// ------------------- Routes -------------------
// User-related routes
app.use("/api/users", userRoutes);

// Book-related routes
app.use("/api/books", bookRoutes);

// ------------------- Debugging: Log Registered Routes -------------------
console.log("Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Route: ${middleware.route.path}`);
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`Route: ${handler.route.path}`);
      }
    });
  }
});

// ------------------- Global Error Handler -------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
