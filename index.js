const express  = require('express');
const fs  = require('fs');
const app = express();
const books = require("./MOCK_DATA.json");
const PORT = 8000;
app.use(express.urlencoded({ extended: false }))



app.get("/api/books",(req,res)=>{
    res.json(books);
})


app.route("/api/bookss/:id").get((req, res)=>{
    const id = Number(req.params.id);
    const books = books.find((book) => book.id === id);
    return res.json(books);
})
.patch((req, res)=>{
    const id = Number(req.params.id);
    const bookIndex = books.findIndex((book) => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(books), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }
        return res.json({ status: 'success', updatedBook });
    });
})

.delete((req, res)=>{
    const id = Number(req.params.id);
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    books.splice(bookIndex, 1);
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(books), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete the book' });
        }
        return res.json({ status: 'success', message: 'Book deleted' });
    });
})



app.post("/api/books",(req,res)=>{
    const body = req.body;
    books.push({...body, id : books.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(books), (err,data)=>{
        return res.json({ status : "success", id : books.length})
    })
})



app.listen(8000, ()=> console.log('listening on port Server: ' + PORT))