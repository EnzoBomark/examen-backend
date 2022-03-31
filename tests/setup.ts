import Knex from 'knex';
import config from '../knexfile';
import database, { connectToDatabase } from '../src/database';

beforeAll(async () => {
  await connectToDatabase();
});

beforeEach(async () => {
  const knex = Knex(config);
  await knex.seed.run();
  await knex.destroy();
});

afterAll(async () => {
  await database.close();
});
