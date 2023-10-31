const Books = require('../models/book')

async function handleGetAllBooks(req, res) {
    const allDbUsers = await Books.find({});
    return res.json(allDbUsers);
}


async function handleGetBookById(req, res) {
    const book = await Books.findById(req.params.id);
    if(!book) return res.status(400).json({error : "Book not found"});
    return res.json(book);
}

async function handleUpdateBookById(req, res){
    await Books.findByIdAndUpdate(req.params.id,{
        title : req.params.title                 //This should come from Frontend.
    });
    return res.json({ status: "success"});
}

async function handleDeleteBookById(req, res){
    await Books.findByIdAndUpdate(req.params.id)
    return res.json({ status: "success" });
}

async function handleCreateNewBook(req, res){
    const body = req.body;
    if(!body){
        return res.status(400).json({message:"Please Enter"});
    }
    const result = await Books.create({
        title: body.title,
        author: body.author,
        summary : body.summary
    })
    console.log("result", result)
    return res.status(201).json({msg : 'success'})
}

module.exports = {
    handleGetAllBooks,
    handleGetBookById,
    handleUpdateBookById,
    handleDeleteBookById,
    handleCreateNewBook
}