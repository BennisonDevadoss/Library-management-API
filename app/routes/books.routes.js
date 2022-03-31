const fastify = require('fastify');
const { createOpts, listOpts } = require('./books.schema')

const bookControllers = require('../controllers/books.controllers');

const userAuthenticate = require('../auth/user.auth');
// const userControllers = require('../controllers/index.controllers').users;

function bookRoutes(fastify, options, done) {

    userAuthenticate(fastify);

    fastify.post('/books', createOpts, bookControllers.create);

    fastify.get('/books', bookControllers.list);

    fastify.get('/books/:id', bookControllers.getById);

    fastify.put('/books/:id', bookControllers.update);

    fastify.delete('/books/:id', bookControllers.destroy);

    done();
}

module.exports = bookRoutes;