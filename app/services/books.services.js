// const Book = require("../controllers/Book")
const db = require('../models');
const { Book } = db;

    function create(attribute) {
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

async function update(id, attribute) {  /// updatedBook
    const book = await Book.findOne({
        where: {
            id: id,
        }
    })
    if (!book) {
        throw new Error("Book Not Found")
    }
    return book.update(attribute)

}

async function destroy(id) {      // deletedBook
    const book = await Book.findOne({
        where: {
            id: id,
        }
    })
    if (!book) {
        throw new Error("Book Not Found")
    }
    return book.destroy(id)
}

module.exports = {
    create,
    list,
    getById,
    update,
    destroy
}
