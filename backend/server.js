const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // User routes for register and login
require("dotenv").config();
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path");

// Serve static files for uploaded profile pictures
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files for default images
app.use("/images", express.static(path.join(__dirname, "../src/images")));


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // All user-related routes

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Debugging route paths
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
