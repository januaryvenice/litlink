// routes/bookRoutes.js

const express = require("express");
const multer = require("multer");
const db = require("../config/db");
const authenticate = require("../middleware/auth");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/books"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Add a new book (Author or Admin only)
router.post("/add", authenticate, upload.single("coverImage"), async (req, res) => {
  const { title, author, genres, description } = req.body;
  const { userId, userTypeId } = req.user;

  // Check user type
  if (userTypeId !== 2 && userTypeId !== 3) {
    return res.status(403).json({ message: "Unauthorized to add books" });
  }

  const coverImage = req.file ? req.file.filename : null;

  try {
    const query = `
      INSERT INTO Books (Title, Author, Genres, Description, CoverImage, AddedBy)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.promise().query(query, [title, author, genres, description, coverImage, userId]);
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Failed to add book" });
  }
});

// Fetch all books
router.get("/", async (req, res) => {
  try {
    const [books] = await db.promise().query("SELECT * FROM Books");
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

// Fetch books by category or search term
router.get("/search", async (req, res) => {
  const { category, search } = req.query;

  try {
    let query = "SELECT * FROM Books WHERE 1=1";
    const params = [];

    if (category) {
      query += " AND Genres LIKE ?";
      params.push(`%${category}%`);
    }
    if (search) {
      query += " AND (Title LIKE ? OR Author LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    const [books] = await db.promise().query(query, params);
    res.json(books);
  } catch (err) {
    console.error("Error searching books:", err);
    res.status(500).json({ message: "Failed to search books" });
  }
});

// Delete a book (Admin only)
router.delete("/:bookId", authenticate, async (req, res) => {
  const { bookId } = req.params;
  const { userTypeId } = req.user;

  // Check user type
  if (userTypeId !== 2) {
    return res.status(403).json({ message: "Unauthorized to delete books" });
  }

  try {
    const query = "DELETE FROM Books WHERE BookID = ?";
    await db.promise().query(query, [bookId]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Failed to delete book" });
  }
});

module.exports = router;
