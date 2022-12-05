'use strict';

const { CATEGORY_TABLE } = require('../models/Category');
const { categoryTypes } = require('../../utils/categoriesTypes');
const [ positive, negative ] = categoryTypes;


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
    await queryInterface.bulkInsert(CATEGORY_TABLE, [
      {
        id: 1,
        name: 'Food and Drink',
        type: negative.id
      },
      {
        id: 2,
        name: 'Shopping',
        type: negative.id
      },
      {
        id: 3,
        name: 'Transportation',
        type: negative.id
      },
      {
        id: 4,
        name: 'Health',
        type: negative.id
      },
      {
        id: 5,
        name: 'Entertainment',
        type: negative.id
      },
      {
        id: 6,
        name: 'Education',
        type: negative.id
      },{
        id: 7,
        name: 'Home',
        type: negative.id
      },
      {
        id: 8,
        name: 'General Expenses',
        type: negative.id
      },
      {
        id: 9,
        name: 'Salary',
        type: positive.id
      },
      {
        id: 10,
        name: 'Gifts',
        type: positive.id
      },
      {
        id: 11,
        name: 'Savings',
        type: positive.id
      },
      {
        id: 12,
        name: 'Investments',
        type: positive.id
      },
      {
        id: 13,
        name: 'Checks, coupons',
        type: positive.id
      },
      {
        id: 14,
        name: 'Sales, bussiness',
        type: positive.id
      },
      {
        id: 15,
        name: 'Other Income',
        type: positive.id
      },
      {
        id: 16,
        name: 'Debit Transfer',
        type: negative.id
      },
      { 
        id: 17,
        name: 'Credit Transfer',
        type: positive.id
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
