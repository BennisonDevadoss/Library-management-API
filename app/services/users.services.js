const bcrypt = require('bcrypt');
const db = require('../models');
const { User } = db;
const jwt = require('jsonwebtoken');
const process = require('process');

function generateAccessToken(email) {
    console.log("emaillllllllllll", email)
    console.log("process.env.TOKEN_SECRET", process.env.TOKEN_SECRET)
    return jwt.sign({ email }, `${process.env.TOKEN_SECRET}`);
}

function validatePassword(user, password) {
    const valid = bcrypt.compareSync(password, user.encrypted_password)
    console.log("valid password", valid)

    if (!valid) {
        throw new Error("Invalid email or password")
    }

}


async function userLogin(loginDetail) {

    const user = await User.findOne({ where: { email: loginDetail.email } });
    console.log('user is', user);

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
    return users.findOne({   //?
        where: {
            id
        }
    }).then((user) => {
        if (!user) {
            throw new Error('User not found')
        }
        return user;     // ?
    })
}

module.exports = {
    userLogin,
    getById,
}