import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('chats', (table: Knex.TableBuilder) => {
    table
      .uuid('match_id')
      .nullable()
      .references('id')
      .inTable('matches')
      .onDelete('CASCADE');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('chats', (table: Knex.TableBuilder) => {
    table.dropColumn('match_id');
  });
};
