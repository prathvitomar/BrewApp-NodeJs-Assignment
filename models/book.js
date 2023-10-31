const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    author : {
        type : String,
        required : true
    },
    summary : {
        type : String
    }
},{timestamps: true})

const Books = mongoose.model("books", bookSchema);
module.exports = Books;