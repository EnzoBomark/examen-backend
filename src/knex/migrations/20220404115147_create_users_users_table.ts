import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('users_users', (table: Knex.TableBuilder) => {
    table.string('user_id').notNullable().references('id').inTable('users');
    table.string('follow_id').notNullable().references('id').inTable('users');
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('users_users');
