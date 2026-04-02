const Book = require("../models/Book");

// CREATE BOOK
exports.createBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;

if (!title || !isbn || !authors) {
  return res.status(400).json({ message: "Missing required fields" });
}

const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL BOOKS
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};

    // search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const books = await Book.find(query)
      .populate("authors")
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: books
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE BOOK (IMPORTANT)
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "OUT") {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();

    res.json({ message: "Book borrowed successfully", book });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "IN") {
      return res.status(400).json({ message: "Book is not borrowed" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.json({ message: "Book returned successfully", book });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
