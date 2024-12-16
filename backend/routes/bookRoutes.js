const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add a new book (admin or author only)
router.post('/add', (req, res) => {
  const { title, description, coverImage, authorID } = req.body;

  const sql = `INSERT INTO Book (Title, Description, CoverImage) VALUES (?, ?, ?)`;
  db.query(sql, [title, description, coverImage], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    // Optionally link the author to the book
    const bookID = result.insertId;
    const authorSQL = `INSERT INTO BookAuthor (BookID, AuthorID) VALUES (?, ?)`;
    db.query(authorSQL, [bookID, authorID], (authorErr) => {
      if (authorErr) return res.status(500).json({ message: 'Author link failed', error: authorErr });

      res.status(201).json({ message: 'Book added successfully', bookID });
    });
  });
});

// Get a list of books
router.get('/', (req, res) => {
  const sql = `SELECT * FROM Book`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

module.exports = router;
