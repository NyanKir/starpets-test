'use strict';
const { getDownSqlFileName, getUpSqlFileName } = require('../utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(getUpSqlFileName());
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(getDownSqlFileName());
  }
};
