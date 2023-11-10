'use strict';
const { getUpSqlFileName, getDownSqlFileName } = require('../utils');
const path = require('node:path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(
      getUpSqlFileName(path.basename(__filename))
    );
  },

  async down(queryInterface) {
    return queryInterface.sequelize.query(
      getDownSqlFileName(path.basename(__filename))
    );
  }
};
