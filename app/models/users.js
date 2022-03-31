'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    encrypted_password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    access_token: {
      allowNull: true,
      type: DataTypes.STRING
    },
  })
  return Users;
};