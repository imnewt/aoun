const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aoun", { useNewUrlParser: true, useUnifiedTopology: true });

const Book = require("../models/book.model");

router.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
})

module.exports = router;