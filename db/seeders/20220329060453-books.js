'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('books', [{  //Books
      name: ' Alchemist',
      category: 'Novel',
      author: 'Paulo Coelho',
      price: 599,
      notes: 'One of the best book in the world',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'The word as I see it',
      category: 'Novel',
      author: 'Albert Einsten',
      price: 399,
      notes: 'International best sellers',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'All the night we can not see',
      category: 'Novel',
      author: 'Mike',
      price: 299,
      notes: null,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('books', null, {});  //Books

  }
};
