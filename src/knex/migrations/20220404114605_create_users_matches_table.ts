import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable(
    'users_matches',
    (table: Knex.TableBuilder) => {
      table.string('user_id').notNullable().references('id').inTable('users');
      table
        .uuid('match_id')
        .notNullable()
        .references('id')
        .inTable('matches')
        .onDelete('CASCADE');
      table.enum('position', ['0', '1', '2', '3']).notNullable();
      table.boolean('is_admin').nullable();
      table.timestamps(true, true);
    }
  );
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('users_matches');
