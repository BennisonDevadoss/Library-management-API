const users = require('../models').Users;
const { verify } = require('jsonwebtoken');
// const dotenv = require('dotenv');

const JWT_SECRET_KEY = process.env.TOKEN_SECRET;
console.log('JWT_SECRET_KEY', JWT_SECRET_KEY);

function getHeaderToken(headers) {
    const bearerHeader = headers.authorization;
    console.log("------------------>", bearerHeader)
    const bearer = bearerHeader ? bearerHeader.split(" ") : [];
    const bearerToken = bearer[1];
    console.log("bearertoken", bearerToken)
    return bearerToken;
}

function verifyToken(token, JWT_SECRET_KEY) {
    return new Promise((resolve, reject) => {
        verify(token, JWT_SECRET_KEY, (err, decoded) => {
            console.log('error is', err);
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
};

const userAuthenticate = (fastify) => {
    fastify.decorateRequest("currentUser", null);
    console.log("----------------------------------------------")
    fastify.addHook("preHandler", async (request, reply) => {
        const token = getHeaderToken(request.headers)
        console.log("token", token);
        if (!token) {
            const error = {
                error: ["You need to sign-in to access this page"],
            };
            reply.status(401).send(error);
        }
        else {
            console.log('else is called')
            try {
                const userAttrs = await verifyToken(token, JWT_SECRET_KEY);
                console.log('userAttrs-->', userAttrs)
                const user = await users.findOne({
                    where: {
                        email: userAttrs.email,
                    }
                });
                if (user && user.access_token === token) {
                    request.currentUser = user;
                    reply.header('Authorization', `Bearer ${token}`);
                }
                else {
                    reply.status(400).send({
                        error: ["session has expired"]
                    });
                }
            }
            catch (error) {
                console.log('catch error', error);
                reply.status(400).send({
                    error: ["Access Denied"]
                })
            }
        }
    })
}

module.exports = userAuthenticate;