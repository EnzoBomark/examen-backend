import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('chats', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.enum('type', ['user', 'group', 'match']).notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('chats');
