import { Sequelize } from 'sequelize-typescript';

import { Users } from 'models/users';

import { sequelizeConfig } from '@/config/sequelize';
import { Jobs } from '@/models/jobs';

export const sequelize = new Sequelize({
  ...sequelizeConfig,
  pool: {
    max: 10
  },
  models: [Users, Jobs]
});
