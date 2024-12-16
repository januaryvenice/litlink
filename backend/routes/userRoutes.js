const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authenticate = require("../middleware/auth");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Ensure the uploads directory exists
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `profile_${Date.now()}_${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

// Register Route
router.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  try {
    const checkUserQuery = "SELECT * FROM User WHERE Username = ? OR Email = ?";
    db.query(checkUserQuery, [username, email], async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (results.length > 0) {
        return res.status(400).json({ message: "Username or email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = `
        INSERT INTO User (Username, FirstName, LastName, Email, Password, UserTypeID, ProfilePicture)
        VALUES (?, ?, ?, ?, ?, 1, NULL)
      `;

      db.query(insertUserQuery, [username, firstName, lastName, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "Failed to register user" });

        res.status(201).json({ message: "User registered successfully!" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM User WHERE Email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user.UserID, username: user.Username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.UserID,
        username: user.Username,
        email: user.Email,
        profilePicture: user.ProfilePicture,
        userType: user.UserTypeID,
      },
    });
  });
});

// Get User Details (Protected)
router.get("/details/:userId", authenticate, async (req, res) => {
  const { userId } = req.params;

  try {
    const [result] = await db.promise().query(
      "SELECT Username, FirstName, LastName, Email, ProfilePicture, UserTypeID FROM User WHERE UserID = ?",
      [userId]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];
    user.ProfilePicture = user.ProfilePicture
      ? `http://localhost:5000/uploads/${user.ProfilePicture}`
      : `http://localhost:5000/images/pfp.jpg`;

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user details" });
  }
});


// Upload Profile Picture Route
router.post("/upload-profile/:userId", authenticate, upload.single("image"), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const newImageFileName = req.file.filename;

  try {
    const [user] = await db.promise().query("SELECT ProfilePicture FROM User WHERE UserID = ?", [
      userId,
    ]);
    const currentImage = user[0]?.ProfilePicture;

    // Delete old profile picture if it exists and is not the default
    if (currentImage && currentImage !== "pfp.jpg") {
      const oldImagePath = path.join(__dirname, "../uploads", currentImage);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    // Update new profile picture in the database
    await db
      .promise()
      .query("UPDATE User SET ProfilePicture = ? WHERE UserID = ?", [newImageFileName, userId]);

    res.json({
      message: "Profile picture updated successfully",
      imageUrl: `http://localhost:5000/uploads/${newImageFileName}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile picture" });
  }
});

// Update Specific User Field (Protected)
router.post("/update-field", authenticate, async (req, res) => {
  const { userId, field, value } = req.body;

  try {
    const validFields = ["FirstName", "LastName", "Email", "Password"];
    if (!validFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    let newValue = value;
    if (field === "Password") newValue = await bcrypt.hash(value, 10);

    await db.promise().query(`UPDATE User SET ${field} = ? WHERE UserID = ?`, [newValue, userId]);
    res.json({ message: `${field} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: "Failed to update field" });
  }
});

// Reset Password - Step 1: Check Email
router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const [result] = await db.promise().query("SELECT * FROM User WHERE Email = ?", [email]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }
    res.json({ message: "Email exists" });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

// Reset Password - Step 2: Validate Name
router.post("/validate-name", async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
    const [result] = await db
      .promise()
      .query("SELECT * FROM User WHERE Email = ? AND FirstName = ? AND LastName = ?", [
        email,
        firstName,
        lastName,
      ]);
    if (result.length === 0) {
      return res.status(400).json({ message: "Name does not match" });
    }
    res.json({ message: "Name validated" });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

// Reset Password - Step 3: Update Password
router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query("UPDATE User SET Password = ? WHERE Email = ?", [hashedPassword, email]);
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password" });
  }
});


// Delete Account
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // First, delete any related records from the authorrequests table
    await db.promise().query("DELETE FROM authorrequests WHERE UserID = ?", [userId]);

    // Then, delete the user record
    await db.promise().query("DELETE FROM User WHERE UserID = ?", [userId]);

    res.json({ message: "User account and associated records deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});


// Request to Become an Author
router.post("/request-author", authenticate, async (req, res) => {
  const { userId } = req.body;

  try {
    // Check if the user already has a pending or approved request
    const [existingRequest] = await db
      .promise()
      .query("SELECT * FROM AuthorRequests WHERE UserID = ? AND Status = 'Pending'", [userId]);

    if (existingRequest.length > 0) {
      return res.status(400).json({ message: "You already have a pending author request" });
    }

    // Insert a new author request
    await db
      .promise()
      .query("INSERT INTO AuthorRequests (UserID, Status) VALUES (?, 'Pending')", [userId]);

    res.json({ message: "Request to become an author submitted successfully" });
  } catch (error) {
    console.error("Error submitting author request:", error);
    res.status(500).json({ message: "Failed to submit request" });
  }
});

// Delete Account Route
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Delete records from related tables
    await db.promise().query("DELETE FROM AuthorRequests WHERE UserID = ?", [userId]);
    await db.promise().query("DELETE FROM Books WHERE AuthorID = ?", [userId]); // Example for books table

    // Delete the user record
    await db.promise().query("DELETE FROM User WHERE UserID = ?", [userId]);

    res.json({ message: "User account and associated records deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});



module.exports = router;
