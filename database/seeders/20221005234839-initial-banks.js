'use strict';

const { BANK_TABLE } = require('../models/Bank');

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
     await queryInterface.bulkInsert(BANK_TABLE, [
      {
        id: 1,
        name: 'Banco de Desarrollo Rural, S.A.',
      },
      {
        id: 2,
        name: 'Banco Industrial, S.A.',
      },
      {
        id: 3,
        name: 'Banco Promerica',
      },
      {
        id: 4,
        name: 'Banco G&T Continental, S.A.',
      },
      {
        id: 5,
        name: 'Banco Fichosa Guatemala',
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
