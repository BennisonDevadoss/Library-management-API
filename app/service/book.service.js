// const Books = require("../controllers/Books")
const Book = require('../models').Books;

function createBook(attribute) {
    return Book.create(attribute);
}

function list() {
    return Book
        .findAll()
}


function getById(id) {
    return Book.findOne({
        where: {
            id
        }
    }).then((book) => {
        if (!book) {
            throw new Error('Book not found')
        }
        return book;
    })
}

async function updatedBook(id, attribute) {
    const book = await Book.findOne({
        where: {
            id:  id ,
        }
    })
    if (!book) {
        throw new Error("Book Not Found")
    }
    return book.update(attribute)

}

async function deleteBook(id) {
    const book = await Book.findOne({
        where: {
            id:  id ,
        }
    })
    if (!book) {
        throw new Error("Book Not Found")
    }
    return book.destroy(id)
}

module.exports = {
    createBook,
    list,
    getById,
    updatedBook,
    deleteBook
}
