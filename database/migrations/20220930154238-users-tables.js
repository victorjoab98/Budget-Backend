'use strict';
const {USER_TABLE, UserSchema} = require('../models/User');
const {CUSTOMER_TABLE, CustomerSchema} = require('../models/Customer');
const {BANK_TABLE, BankSchema} = require('../models/Bank');
const {ACCOUNT_TABLE, AccountSchema} = require('../models/Account');
const {TRANSFER_TABLE, TransferSchema} = require('../models/Transfers');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( USER_TABLE, UserSchema);
    await queryInterface.createTable( CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable( BANK_TABLE, BankSchema);
    await queryInterface.createTable( ACCOUNT_TABLE, AccountSchema);
    await queryInterface.createTable( TRANSFER_TABLE, TransferSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable( USER_TABLE);
    await queryInterface.dropTable( CUSTOMER_TABLE);
    await queryInterface.dropTable( BANK_TABLE);
    await queryInterface.dropTable( ACCOUNT_TABLE);
    await queryInterface.dropTable( TRANSFER_TABLE);
  }
};
