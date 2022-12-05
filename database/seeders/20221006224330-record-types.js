'use strict';

const { RECORD_TYPE_TABLE } = require('../models/RecordType');

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
    await queryInterface.bulkInsert(RECORD_TYPE_TABLE, [
      {
        id: 1,
        name: 'Income'
      },
      {
        id: 2,
        name: 'Expense'
      },
      {
        id: 3,
        name: 'Transfer'
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
