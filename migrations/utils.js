'use strict';

const path = require('node:path');
const fs = require('node:fs');

const getUpSqlFileName = (name) => {
  const file = path.join(
    __dirname,
    `./migrations/${name.split('-')[0]}-up.sql`
  );
  return fs.readFileSync(file, {
    encoding: 'utf-8'
  });
};

const getDownSqlFileName = (name) => {
  const file = path.join(
    __dirname,
    `./migrations/${name.split('-')[0]}-down.sql`
  );
  return fs.readFileSync(file, {
    encoding: 'utf-8'
  });
};

module.exports = {
  getDownSqlFileName,
  getUpSqlFileName
};
