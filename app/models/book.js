'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {  //Books
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
    },
  },
    {
      tablename: 'books',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    })
  return Book;  // ?
};