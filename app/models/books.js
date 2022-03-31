'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    category: {
      allowNull: true,
      type: DataTypes.STRING
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    notes: {
      allowNull: true,
      type: DataTypes.STRING
    }
  })
  return Books;
};