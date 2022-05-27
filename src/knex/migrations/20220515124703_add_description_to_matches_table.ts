import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('matches', (table: Knex.TableBuilder) => {
    table.string('description').nullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('matches', (table: Knex.TableBuilder) => {
    table.dropColumn('description');
  });
};
