import assert from 'assert';

import { Options } from 'sequelize';

assert(process.env.PG_USERNAME, 'PG_USERNAME not found');
assert(process.env.PG_DB_NAME, 'PG_DB_NAME not found');
assert(process.env.PG_HOST, 'PG_HOST not found');
assert(process.env.PG_PORT, 'PG_PORT not found');

export const sequelizeConfig: Options = {
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD || undefined,
  database: process.env.PG_DB_NAME,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  dialect: 'postgres',
  logging: false
};
