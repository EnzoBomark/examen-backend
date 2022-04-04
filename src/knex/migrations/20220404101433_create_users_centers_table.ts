import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable(
    'users_centers',
    (table: Knex.TableBuilder) => {
      table.string('user_id').notNullable().references('id').inTable('users');
      table
        .uuid('center_id')
        .notNullable()
        .references('id')
        .inTable('centers')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }
  );
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('users_centers');
