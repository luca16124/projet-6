const { Book } = require("../models/Book");
const express = require("express");
const { upload } = require ("../middlewares/multer");


const booksRouter = express.Router();
booksRouter.get("/:id", getBookById);
booksRouter.get("/", checkToken, getBooks);
booksRouter.post("/", checkToken, upload.single("image"), postbook);

function checkToken(req, res, next) {
    const headers = req.headers;
    console.log("headers:", headers);
    next();
}

async function getBookById(req, res) {
    const id = req.params.id;
    try{

        const book = await Book.findById(id);
        if (book == null) {
            res.status(404).send("book not found");
            return;
        }
        book.imageUrl = getAbsoluteImagePath(book.imageUrl);
        res.send(book);


    } catch (e) {

        console.error(e);
        res.status(500).send("somthing went wrong:" + e.message);

    }
}

async function postbook(req, res) {
    const file = req.file;    
    const stringifiedBook = req.body.book;
    const book = JSON.parse(stringifiedBook);
    const filename = req.file.filename;
    book.imageUrl = filename;
    try{
        const result = await Book.create(book);
        res.send({ message: "book posted", book: result });
    } catch (e) {
        console.error(e);
        res.status(500).send("somthing went wrong:" + e.message);
    }
}

async function getBooks(req, res) {
    const books = await Book.find();
    books.forEach((book) =>{
        book.imageUrl = getAbsoluteImagePath(book.imageUrl);
    });
    res.send(books);
};

function getAbsoluteImagePath(fileName) {
    return process.env.PUBLIC_URL + "/" + process.env.IMAGES_FOLDER_PATH + "/" + fileName;
};

module.exports = { booksRouter };