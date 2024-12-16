const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new post
router.post('/create', (req, res) => {
  const { authorID, title, content } = req.body;

  const sql = `INSERT INTO BlogPost (AuthorID, Title, Content) VALUES (?, ?, ?)`;
  db.query(sql, [authorID, title, content], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({ message: 'Post created successfully', postID: result.insertId });
  });
});

// Add a comment to a post
router.post('/comment', (req, res) => {
  const { postID, userID, parentCommentID, commentText } = req.body;

  const sql = `INSERT INTO Comment (PostID, UserID, ParentCommentID, CommentText) VALUES (?, ?, ?, ?)`;
  db.query(sql, [postID, userID, parentCommentID, commentText], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({ message: 'Comment added successfully', commentID: result.insertId });
  });
});

module.exports = router;
