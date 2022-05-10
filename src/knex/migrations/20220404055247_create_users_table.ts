import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.string('id').primary().notNullable().unique();
    table.string('name').notNullable();
    table.string('fcm').nullable();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable();
    table.string('picture').nullable();
    table.string('birth_date').nullable();
    table.string('description').nullable();
    table.enum('skill', ['0', '1', '2', '3', '4', '5']).nullable();
    table.boolean('is_right_hand').notNullable();
    table
      .uuid('city_id')
      .nullable()
      .references('id')
      .inTable('cities')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('users');
