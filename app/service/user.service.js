const bcrypt = require('bcrypt');
const Users = require('../models').Users;
const jwt = require('jsonwebtoken');
const process = require('process');

function generateAccessToken(email) {
    console.log("process.env.TOKEN_SECRET", process.env.TOKEN_SECRET)
    return jwt.sign({ email }, `${process.env.TOKEN_SECRET}`, { expiresIn: 1800 });
}

function validatePassword(user, password) {
    const valid = bcrypt.compareSync(password, user.encrypted_password)
    console.log("valid password", valid)

    if (!valid) {
        throw new Error("Invalid email or password")
    }

}


async function userLogin(loginDetail) {

    const user = await Users.findOne({ email: loginDetail.email });

    if (!user) {
        throw new Error("Invalid user name or password");
    }

    validatePassword(user, loginDetail.password);

    const access_token = generateAccessToken(loginDetail.email);
    console.log("access token-------------------->", access_token)

    await user.update({
        access_token: access_token,
    })

    return access_token;
}

function getById(id) {
    return Users.findOne({
        where: {
            id
        }
    }).then((users) => {
        if (!users) {
            throw new Error('User not found')
        }
        return users;
    })
}

module.exports = {
    userLogin,
    getById,
}