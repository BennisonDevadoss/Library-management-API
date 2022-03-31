const Books = require('../models').Books;
const service = require('../service/book.service');

function create(req, reply) {
    const attribute = {
        name: req.body.name,
        category: req.body.category,
        author: req.body.author,
        price: req.body.price,
        notes: req.body.notes
    }
    return service.createBook(attribute)
        .then(books => reply.status(200).send(books))
        .catch(error => reply.status(400).send(error))
}

function list(req, reply) {
    return service.list()
        .then(books => reply.status(200).send(books))
        .catch(error => reply.status(400).send(error));
}

function listOne(req, reply) {
    const id = req.params.id;
    return service.getById(id).then((book) => {
        reply.send(book)
    }).catch((error) => {
        reply.send(error);
    })

}
//....................................................................

function updated(req, reply) {
    const attribute = {
        name: req.body.name,
        category: req.body.category,
        author: req.body.author,
        price: req.body.price,
        notes: req.body.notes

    }
    return service.updatedBook(req.params.id,attribute)
        .then((book) => reply.status(200).send(book))
        .catch(error => reply.status(400).send(error))
}

function deleted(req, reply) {
    return service.deleteBook(req.params.id)
        .then(() => reply.status(200).send({
            message: "Book was deleted successfully"
        }))
        .catch(error => reply.status(400).send(error))
}


module.exports = {
    create,
    list,
    listOne,
    updated,
    deleted
}
