const fastify = require('fastify');
const userControllers = require('../controllers/index.controllers').users;

function userRoutes(fastify, options, done) {

    fastify.post('/login', userControllers.login);
    done();
}
module.exports = userRoutes 
