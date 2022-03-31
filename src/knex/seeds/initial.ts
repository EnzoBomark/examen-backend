import { Knex } from 'knex';

/* eslint-disable import/prefer-default-export */
export const seed = async (knex: Knex): Promise<void> => {
  await knex('cities').del();
  await knex('countries').del();

  await knex('countries').insert([
    {
      id: '19ae4b1b-03de-444f-a508-311333965a25',
      name: 'Sweden',
    },
    {
      id: 'ae92e451-1a47-4aa3-b587-103afe8b8f67',
      name: 'Denmark',
    },
    {
      id: 'ad7151aa-618b-401d-b822-731e668b3455',
      name: 'Finland',
    },
    {
      id: '093db85b-ce2f-4292-874b-807bf1e4d50e',
      name: 'Norway',
    },
  ]);

  await knex('cities').insert([
    {
      id: 'fe59bd04-1abb-4734-8592-e9bb7016a2c8',
      name: 'Stockholm',
      country_id: '19ae4b1b-03de-444f-a508-311333965a25',
    },
    {
      id: '16b187e8-a950-49d6-8142-91c3f2c255e8',
      name: 'Oslo',
      country_id: '093db85b-ce2f-4292-874b-807bf1e4d50e',
    },
    {
      id: '60a79600-cc01-4ae4-9ebe-89a7da95c23d',
      name: 'Helsingfors',
      country_id: 'ad7151aa-618b-401d-b822-731e668b3455',
    },
  ]);
};
