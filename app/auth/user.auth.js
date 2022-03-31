const db = require('../models');
const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');



const JWT_SECRET_KEY = process.env.TOKEN_SECRET;

const { User } = db;

function getHeaderToken(headers) {
    const bearerHeader = headers.authorization;
    const bearer = bearerHeader ? bearerHeader.split(" ") : [];
    const bearerToken = bearer[1];
    return bearerToken;
}

function verifyToken(token, JWT_SECRET_KEY) {
    return new Promise((resolve, reject) => {
        verify(token, JWT_SECRET_KEY, (err, decoded) => {
            // console.log('error is', err);
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
    fastify.addHook("preHandler", async (request, reply) => {
        const token = getHeaderToken(request.headers)
        // console.log("token is ======>", token)
        if (!token) {
            const error = {
                error: ["You need to sign-in to access this page"],
            };
            reply.status(401).send(error);
        }
        else {
            // console.log("======================>is else block working")
            try {
                const userAttrs = await verifyToken(token, JWT_SECRET_KEY);
                console.log('userAttrs-->', userAttrs.email);
                console.log('User is', User);
                const user = await User.findOne({
                    where: {
                        email: userAttrs.email///?
                    }
                });
                console.log("user============-----------------------=>", user);
                // console.log("user.access_toke ", user.access_token)
                // console.log("------------------>token", token)
                if (user && user.access_token === token) {
                    // console.log("------------------------------------------------------------------------")
                    request.currentUser = user;
                    reply.header('Authorization', `Bearer ${token}`);
                }
                else {
                    // console.log("------------------------------------------------------------------------")

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














