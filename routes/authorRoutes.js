const express = require("express");
const router = express.Router();

const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} = require("../controllers/authorController");

const { validateAuthor } = require("../middleware/validate");

// Create author
router.post("/", validateAuthor, createAuthor);

// Get all authors
router.get("/", getAuthors);

// Get single author
router.get("/:id", getAuthor);

// Update author
router.put("/:id", updateAuthor);

// Delete author
router.delete("/:id", deleteAuthor);

module.exports = router;