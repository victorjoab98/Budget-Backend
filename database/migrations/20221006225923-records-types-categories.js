'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('../models/Category');
const { RECORD_TABLE, RecordSchema } = require('../models/Record');
const { RECORD_TYPE_TABLE, RecordTypeSchema } = require('../models/RecordType');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable( CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable( RECORD_TYPE_TABLE, RecordTypeSchema);
    await queryInterface.createTable( RECORD_TABLE, RecordSchema);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable( CATEGORY_TABLE );
     await queryInterface.dropTable( RECORD_TYPE_TABLE );
     await queryInterface.dropTable( RECORD_TABLE );
  }
};
