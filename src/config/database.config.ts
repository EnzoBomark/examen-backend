import { Sequelize } from 'sequelize';
import { badImplementation } from '@hapi/boom';

import { debug } from '../utils';

const dialectOptions =
  process.env.NODE_ENV === 'production'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : undefined;

const database = new Sequelize(process.env.DATABASE_URL || '', {
  dialectOptions,
  logging: false,
});

export const connectToDatabase = async () => {
  try {
    await database.authenticate();

    debug('Connection has been established successfully.');
  } catch (error) {
    throw badImplementation('Unable to connect to the database:', error);
  }
};

export default database;
