import { Sequelize } from 'sequelize';
import { badImplementation } from '@hapi/boom';

import { debug } from '../utils';
import { associations, tables } from '../models';
import { pivots } from '../pivots';

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

    await tables.forEach((table) => table(database));
    await pivots.forEach((table) => table(database));
    await associations.forEach((association) => association());

    debug('Connection has been established successfully.');
  } catch (error) {
    throw badImplementation('Unable to connect to the database:', error);
  }
};

export default database;
