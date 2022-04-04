import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('centers', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.string('name').notNullable();
    table.string('picture').nullable();
    table.string('address').notNullable();
    table.string('contact_url').notNullable();
    table.string('booking_url').notNullable();
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
  knex.schema.dropTable('centers');
