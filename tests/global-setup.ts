import dotenv from 'dotenv';
import Knex from 'knex';
import { parse } from 'pg-connection-string';
import config from '../knexfile';
import 'ts-node/register';

dotenv.config({ path: '../.env.testing' });

// Seed the database with schema and data
async function setupDatabase() {
  const connectionString = parse(config.connection.connectionString || '');
  const database = connectionString.database || '';
  const knex = Knex({
    ...config,
    connection: {
      timezone: 'utc',
      user: connectionString.user,
      password: connectionString.password,
      port: Number(connectionString.port || ''),
      host: connectionString.host || '',
    },
  });

  try {
    await knex.raw('DROP DATABASE IF EXISTS ??', database);
    await knex.raw('CREATE DATABASE ??', database);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to set up database');
  } finally {
    await knex.destroy();
  }
}

// Seed the database with schema and data
async function setupModels() {
  const knex = Knex(config);

  try {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await knex.migrate.latest();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to set up database');
  } finally {
    await knex.destroy();
  }
}

module.exports = async () => {
  await setupDatabase();
  await setupModels();
};
