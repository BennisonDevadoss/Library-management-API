
const fastify = require('fastify')({
    logger: true
});
const process = require('process')

// const jwt = require('jsonwebtoken');
// const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../.env` });
// console.log("secret token", process.env.TOKEN_SECRET)

const PORT = 4000;

fastify.register(require('./routes/books.routes'));
fastify.register(require('./routes/user-auth.routes'));

fastify.listen(PORT, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})