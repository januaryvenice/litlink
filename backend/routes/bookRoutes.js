// routes/bookRoutes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/db");
const authenticateToken = require("../middleware/authenticateToken");


const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/books/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Publish a new book
router.post("/publish", authenticateToken, upload.single("cover"), (req, res) => {
  const { title, description, authorName, genres } = req.body;
  const userId = req.user.id; // UserID derived from token
  console.log("User ID from token:", req.user.id);

  if (!title || !description || !req.file || !genres || !authorName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const coverPath = `/uploads/books/${req.file.filename}`;
  const publishDate = new Date();

  const bookInsertQuery =
    "INSERT INTO book (Title, Description, Cover, PublishedDate, UserID, AuthorName) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    bookInsertQuery,
    [title, description, coverPath, publishDate, userId, authorName],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to publish book." });
      }

      const bookId = result.insertId; // Get the inserted book's ID
      const genreList = JSON.parse(genres); // Parse the genres array

      // Insert each genre into 'Genre' table and link to BookGenre
      genreList.forEach((genreName) => {
        genreName = genreName.startsWith("#") ? genreName : `#${genreName}`;

        const genreInsertQuery = "INSERT IGNORE INTO Genre (GenreName) VALUES (?)";
        db.query(genreInsertQuery, [genreName], (err) => {
          if (err) console.error(err);

          const bookGenreInsertQuery = `
            INSERT INTO BookGenre (BookID, GenreID)
            SELECT ?, GenreID FROM Genre WHERE GenreName = ?
          `;

          db.query(bookGenreInsertQuery, [bookId, genreName], (err) => {
            if (err) console.error(`Failed to link genre '${genreName}'`, err);
          });
        });
      });

      res.status(201).json({ message: "Book published successfully!" });
    }
  );
});


//Updating book

router.put("/update/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const { title, description, authorName } = req.body;
  const userId = req.user ? req.user.UserID : null;

  if (!userId) {
    return res.status(403).json({ message: "Unauthorized access." });
  }

  try {
    // Update only if the UserID matches
    const [result] = await db.promise().query(
      `UPDATE book 
       SET Title = ?, Description = ?, AuthorName = ?
       WHERE BookID = ? AND UserID = ?`,
      [title, description, authorName, bookId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found or access denied." });
    }

    res.json({ message: "Book updated successfully!" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book." });
  }
});



// Fetch all books
router.get("/", async (req, res) => {
  try {
    const [book] = await db.promise().query("SELECT * FROM Book");
    res.json(book);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

// Fetch books by category or search term
router.get("/search", async (req, res) => {
  const { search, category } = req.query;

  try {
      let query = `
          SELECT b.BookID, b.Title, b.Description, b.Cover, b.AuthorName, 
                 GROUP_CONCAT(g.GenreName) as Genres
          FROM book b
          LEFT JOIN BookGenre bg ON b.BookID = bg.BookID
          LEFT JOIN Genre g ON bg.GenreID = g.GenreID
          WHERE 1=1
      `;
      const params = [];

      if (search) {
          query += ` AND (b.Title LIKE ? OR b.AuthorName LIKE ? OR g.GenreName LIKE ?)`;
          params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }
      if (category) {
          query += ` AND g.GenreName = ?`;
          params.push(category);
      }

      query += ` GROUP BY b.BookID`;
      const [book] = await db.promise().query(query, params);
      res.json(book);
  } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ message: "Failed to fetch books." });
  }
});


// Delete a book (Admin only)
router.delete("/:bookId", authenticateToken, async (req, res) => {
  const { bookId } = req.params;
  const { userTypeId } = req.user;

  // Check user type
  if (userTypeId !== 2) {
    return res.status(403).json({ message: "Unauthorized to delete books" });
  }

  try {
    const query = "DELETE FROM Book WHERE BookID = ?";
    await db.promise().query(query, [bookId]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Failed to delete book" });
  }
});

module.exports = router;
