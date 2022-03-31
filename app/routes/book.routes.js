const fastify = require('fastify');

const bookControllers = require('../controllers/index.controllers').books;

const userAuthenticate = require('../Auth/user.auth');
const userControllers = require('../controllers/index.controllers').users;


function bookRoutes(fastify, options, done) {

    userAuthenticate(fastify);

    fastify.post('/books', bookControllers.create);

    fastify.get('/books', bookControllers.list);

    fastify.get('/books/:id', bookControllers.listOne);

    fastify.put('/books/:id', bookControllers.updated);

    fastify.delete('/books/:id', bookControllers.deleted);

    done();
}

module.exports = bookRoutes;