'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', { //Books
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      notes: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {                //createdAt
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {               //updatedAt
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {               //deletedAt
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');  //Books
  }
};

