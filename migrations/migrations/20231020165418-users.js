'use strict';
const path = require('node:path');
const fs = require('node:fs');

const getUpSqlFileName = () => {
  const file = path.join(__dirname, `./up.sql`);
  return fs.readFileSync(file, {
    encoding: 'utf-8'
  });
};

const getDownSqlFileName = () => {
  const file = path.join(__dirname, `./down.sql`);
  return fs.readFileSync(file, {
    encoding: 'utf-8'
  });
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(getUpSqlFileName());
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(getDownSqlFileName());
  }
};
