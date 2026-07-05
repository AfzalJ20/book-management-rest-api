const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Books Array
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho"
    },
    {
        id: 2,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki"
    },
    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear"
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Book API!");
});

// GET All Books
app.get("/books", (req, res) => {
    res.json(books);
});

// POST New Book
app.post("/books", (req, res) => {

    const newBook = req.body;

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully!",
        book: newBook
    });

});


// PUT - Update a book
app.put("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.status(200).json({
        message: "Book updated successfully!",
        book: book
    });

});
app.delete("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.status(200).json({
        message: "Book deleted successfully!",
        deletedBook: deletedBook[0]
    });

});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});