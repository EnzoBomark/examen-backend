import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('matches', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.enum('type', ['single', 'double']).nullable();
    table.string('date_time').notNullable();
    table.string('court').nullable();
    table.enum('duration', ['60', '90', '120']).nullable();
    table.enum('currency', ['SEK', 'EUR']).nullable();
    table.float('price').nullable();
    table.integer('skill').nullable();
    table.string('phone').nullable();
    table.integer('team_one_score').nullable();
    table.integer('team_two_score').nullable();
    table.boolean('is_public').notNullable();
    table.boolean('is_played').notNullable();
    table.boolean('is_booked').notNullable();
    table
      .uuid('center_id')
      .nullable()
      .references('id')
      .inTable('centers')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('matches');
