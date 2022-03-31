// const Users = require('../models').Users;
const dotenv = require('dotenv');
const service = require('../services/users.services');


process.env.TOKEN_SECRET;
console.log('process.env.TOKEN_SECRET:', process.env.TOKEN_SECRET);

function login(req, reply) {

    const loginDetail = {
        email: req.body.email,
        password: req.body.password
    }
    console.log('loginDetail is', loginDetail)

    return service.userLogin(loginDetail)
        .then((access_token) => {
            reply.header('Authorization', `Bearer ${access_token}`);
            reply.status(200).send({
                message: "Login successfully"
            });
        })
        .catch(error => reply.status(400).send(error));
}

module.exports = {
    login,
}