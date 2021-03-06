'use strict';

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
// const { generateAccessToken } = require('../../app/controllers/Users');
// console.log("generageAccessToken", generateAccessToken);

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{  //Users
      name: 'Bennison D',
      email: 'bennisondevadoss@gmail.com',
      encrypted_password: bcrypt.hashSync('bennison', 10),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {}); //Users

  }
};
