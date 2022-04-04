import { Knex } from 'knex';

/* eslint-disable import/prefer-default-export */
export const seed = async (knex: Knex): Promise<void> => {
  await knex('cities').del();
  await knex('countries').del();
  await knex('users').del();

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

  await knex('users').insert([
    {
      id: '1',
      name: 'Enzo',
      email: 'enzo.boma@hotmail.com',
      phone: '0793490526',
      picture: null,
      description: 'My name is Enzo',
      skill: '3',
      is_right_hand: true,
    },
    {
      id: '2',
      name: 'Jane',
      email: 'jane@doe.se',
      phone: '0793490527',
      picture:
        'https://images.unsplash.com/photo-1598134493179-51332e56807f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      description: 'My name is Jane',
      skill: '3',
      is_right_hand: true,
    },
    {
      id: '3',
      name: 'John',
      email: 'john@doe.se',
      phone: '0793490528',
      picture:
        'https://images.unsplash.com/photo-1583512603806-077998240c7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80',
      description: 'My name is John',
      skill: '3',
      is_right_hand: false,
    },
    {
      id: '4',
      name: 'Greta',
      email: 'greta@test.se',
      phone: '0793490529',
      picture:
        'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80',
      description: 'My name is Greta',
      skill: '3',
      is_right_hand: false,
    },
  ]);
};
