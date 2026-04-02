const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// CRUD
router.post("/", bookController.createBook);
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

// SPECIAL
router.post("/:id/borrow", bookController.borrowBook);
router.post("/:id/return", bookController.returnBook);

module.exports = router;