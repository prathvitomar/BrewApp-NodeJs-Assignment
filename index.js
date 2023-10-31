const express  = require('express');
const mongoose = require('mongoose');
const app = express();
const {connectMongoDB} = require('./connection');
const bookRouter = require('./routes/book')

const dbURI = "mongodb+srv://prathvitomar030499:pt030499@blogdb.7xaamlp.mongodb.net/"
connectMongoDB(dbURI).then(()=> console.log("MongoDB is Connected"))

app.use(express.urlencoded({ extended: false }))

app.use("/api/books", bookRouter)

app.listen(8000)