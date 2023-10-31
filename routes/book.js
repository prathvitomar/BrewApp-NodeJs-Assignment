const express  = require('express');
const {handleGetAllBooks,
    handleGetBookById,
    handleUpdateBookById,
    handleDeleteBookById,
    handleCreateNewBook} = require('../controllers/book');

const router = express.Router();

router.route("/").get(handleGetAllBooks).post(handleCreateNewBook)

router.route("/:id")
    .get(handleGetBookById)
    .patch(handleUpdateBookById)
    .delete(handleDeleteBookById)

module.exports = router