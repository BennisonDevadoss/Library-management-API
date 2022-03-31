const fastify = require('fastify');
const userControllers = require('../controllers/user.controllers');

function userRoutes(fastify, options, done) {

    fastify.post('/login', userControllers.login);
    done();
}
module.exports = userRoutes 
