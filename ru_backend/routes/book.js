const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// POST /api/books - Add a book
router.post("/", async (req, res) => {
  try {
    const { user, title, author, genre, year, coverUrl, description } = req.body;

    if (!user || !title || !author || !genre) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBook = new Book({
      user,
      title,
      author,
      genre,
      year,
      coverUrl,
      description,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/books - Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ books });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
