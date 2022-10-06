'use strict';

const { CURRENCY_TABLE } = require('../models/Currency');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(CURRENCY_TABLE, [
      {
        id: 1,
        code: 'GTQ',
        symbol: 'Q',
        name: 'Quetzal',
      },
      {
        id: 2,
        code: 'USD',
        symbol: '$',
        name: 'Dolar',
      },
      {
        id: 3,
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
      },{
        id: 4,
        code: 'GBP',
        symbol: '£',
        name: 'Libra Esterlina',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
