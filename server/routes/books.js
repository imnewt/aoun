const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { MONGO_URL } = require("../../env");
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Book = require("../models/book.model");

router.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
})

module.exports = router;