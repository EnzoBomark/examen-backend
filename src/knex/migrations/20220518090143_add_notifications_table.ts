import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable(
    'notifications',
    (table: Knex.TableBuilder) => {
      table.uuid('id').primary().notNullable().unique();
      table.enum('type', ['follow', 'result', 'invite']).notNullable();
      table.string('is_read').notNullable();
      table
        .string('sender_id')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .string('receiver_id')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .uuid('match_id')
        .nullable()
        .references('id')
        .inTable('matches')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }
  );
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('notifications');
