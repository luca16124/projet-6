const { books } = require("../db/books");
const { Book } = require("../models/Book");
const express = require("express");
const { upload } = require ("../middlewares/multer");


async function postbook(req, res) {
    const file = req.file;    const stringifiedBook = req.body.book;
    const book = JSON.parse(stringifiedBook);
    book.imageUrl = file.path;
    try{
        const result = await Book.create(book);
        res.send({ message: "book posted", book: result });
    } catch (e) {
        console.error(e);
        res.status(500).send("somthing went wrong:" + e.message);
    }
}

function getBooks(req, res) {
    res.send(books);
};


const booksRouter = express.Router();
booksRouter.get("/", getBooks);
booksRouter.post("/", upload.single("image"), postbook);

module.exports = { booksRouter };