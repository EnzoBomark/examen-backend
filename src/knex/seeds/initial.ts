import { Knex } from 'knex';

/* eslint-disable import/prefer-default-export */
export const seed = async (knex: Knex): Promise<void> => {
  await knex('users_centers').del();
  await knex('users_cities').del();
  await knex('users_chats').del();
  await knex('users_matches').del();
  await knex('users_users').del();
  await knex('cities').del();
  await knex('countries').del();
  await knex('centers').del();
  await knex('chats').del();
  await knex('matches').del();
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

  await knex('centers').insert([
    {
      id: 'e9988682-3539-4d37-a620-93056126b9cd',
      name: 'Stockholm Tennis Center',
      picture:
        'https://images.unsplash.com/photo-1613870930431-a09c7139eb33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      address: 'example 00',
      contact_url: 'https://example.se',
      booking_url: 'https://example.se',
      city_id: 'fe59bd04-1abb-4734-8592-e9bb7016a2c8',
    },
    {
      id: 'd367b332-fe6d-4a06-a9f9-fb5c68b4e5c8',
      name: 'Oslo Tennis Center',
      picture:
        'https://images.unsplash.com/photo-1613870930431-a09c7139eb33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      address: 'example 00',
      contact_url: 'https://example.se',
      booking_url: 'https://example.se',
      city_id: '16b187e8-a950-49d6-8142-91c3f2c255e8',
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

  await knex('matches').insert([
    {
      id: '67860eb0-1084-40d2-8f34-3017eccd9992',
      center_id: 'd367b332-fe6d-4a06-a9f9-fb5c68b4e5c8',
      date_time: '1641205122',
      court: '1',
      duration: '60',
      currency: 'SEK',
      price: null,
      skill: null,
      phone: null,
      team_one_score: null,
      team_two_score: null,
      is_public: false,
      is_played: false,
      is_booked: false,
    },
    {
      id: '73ffd8cd-f0b5-452e-98a0-cc7010656554',
      center_id: 'd367b332-fe6d-4a06-a9f9-fb5c68b4e5c8',
      date_time: '1641205122',
      court: '1',
      duration: '120',
      currency: 'SEK',
      price: '99',
      skill: '3',
      phone: '0793490525',
      team_one_score: null,
      team_two_score: null,
      is_public: true,
      is_played: false,
      is_booked: true,
    },
    {
      id: '5aaedc31-1be3-4950-807f-789dc67752a3',
      center_id: 'e9988682-3539-4d37-a620-93056126b9cd',
      date_time: '1641205122',
      court: '1',
      duration: '120',
      currency: 'SEK',
      price: '99',
      skill: '3',
      phone: '0793490525',
      team_one_score: null,
      team_two_score: null,
      is_public: true,
      is_played: false,
      is_booked: true,
    },
    {
      id: '7415c581-e132-4a72-a7d8-6bfe7113c6f3',
      center_id: 'd367b332-fe6d-4a06-a9f9-fb5c68b4e5c8',
      date_time: '1641205122',
      court: '1',
      duration: '120',
      currency: 'SEK',
      price: '99',
      skill: '3',
      phone: '0793490525',
      team_one_score: null,
      team_two_score: null,
      is_public: false,
      is_played: true,
      is_booked: true,
    },
    {
      id: '9cde1c63-5466-490d-9ba3-903137926765',
      center_id: 'e9988682-3539-4d37-a620-93056126b9cd',
      date_time: '1641205122',
      court: '1',
      duration: '120',
      currency: 'SEK',
      price: '99',
      skill: '3',
      phone: '0793490525',
      team_one_score: null,
      team_two_score: null,
      is_public: true,
      is_played: false,
      is_booked: true,
    },

    {
      id: 'e6a012d5-c079-4565-a431-9afe5623541c',
      center_id: 'd367b332-fe6d-4a06-a9f9-fb5c68b4e5c8',
      date_time: '1641205122',
      court: '1',
      duration: '60',
      currency: 'SEK',
      price: null,
      skill: null,
      phone: null,
      team_one_score: null,
      team_two_score: null,
      is_public: false,
      is_played: false,
      is_booked: false,
    },
    {
      id: 'df021407-4204-413c-b2da-03a639edad31',
      center_id: 'd367b332-fe6d-4a06-a9f9-fb5c68b4e5c8',
      date_time: '1641205122',
      court: '1',
      duration: '120',
      currency: 'SEK',
      price: '99',
      skill: '3',
      phone: '0793490525',
      team_one_score: null,
      team_two_score: null,
      is_public: false,
      is_played: false,
      is_booked: true,
    },
    {
      id: 'b2c5b01d-3371-4911-b45a-528e8fb4aba9',
      center_id: 'e9988682-3539-4d37-a620-93056126b9cd',
      date_time: '1641205122',
      court: '1',
      duration: '120',
      currency: 'SEK',
      price: '99',
      skill: '3',
      phone: '0793490525',
      team_one_score: null,
      team_two_score: null,
      is_public: true,
      is_played: false,
      is_booked: true,
    },
  ]);

  await knex('chats').insert([
    {
      id: '212c742a-4af0-4289-9305-3b50b4b68b01',
      type: 'user',
      match_id: null,
    },
    {
      id: '40e43fd2-205f-411d-8f69-f68f4edc0126',
      type: 'user',
      match_id: null,
    },
    {
      id: '5d696af8-c1ac-43d0-9877-5824b41a6e04',
      type: 'group',
      match_id: null,
    },
    {
      id: '56e7b579-7e8d-4a9a-8e9c-06e6a6a4b287',
      type: 'group',
      match_id: null,
    },
    {
      id: 'c6d14309-0882-4251-8556-c01f2042bc9d',
      type: 'match',
      match_id: '9cde1c63-5466-490d-9ba3-903137926765',
    },
  ]);

  await knex('users_matches').insert([
    {
      user_id: '1',
      match_id: '9cde1c63-5466-490d-9ba3-903137926765',
      position: '1',
      is_admin: true,
    },
    {
      user_id: '2',
      match_id: '9cde1c63-5466-490d-9ba3-903137926765',
      position: '0',
      is_admin: false,
    },
    {
      user_id: '3',
      match_id: '9cde1c63-5466-490d-9ba3-903137926765',
      position: '2',
      is_admin: false,
    },
    {
      user_id: '4',
      match_id: '9cde1c63-5466-490d-9ba3-903137926765',
      position: '3',
      is_admin: false,
    },
    {
      user_id: '2',
      match_id: '7415c581-e132-4a72-a7d8-6bfe7113c6f3',
      position: '0',
      is_admin: true,
    },
    {
      user_id: '2',
      match_id: '5aaedc31-1be3-4950-807f-789dc67752a3',
      position: '0',
      is_admin: true,
    },
    {
      user_id: '3',
      match_id: '5aaedc31-1be3-4950-807f-789dc67752a3',
      position: '1',
      is_admin: false,
    },
    {
      user_id: '1',
      match_id: '73ffd8cd-f0b5-452e-98a0-cc7010656554',
      position: '0',
      is_admin: true,
    },
    {
      user_id: '1',
      match_id: '67860eb0-1084-40d2-8f34-3017eccd9992',
      position: '0',
      is_admin: true,
    },
    {
      user_id: '2',
      match_id: 'e6a012d5-c079-4565-a431-9afe5623541c',
      position: '0',
      is_admin: true,
    },
    {
      user_id: '1',
      match_id: 'e6a012d5-c079-4565-a431-9afe5623541c',
      position: '1',
      is_admin: false,
    },
    {
      user_id: '4',
      match_id: 'e6a012d5-c079-4565-a431-9afe5623541c',
      position: '2',
      is_admin: false,
    },
    {
      user_id: '3',
      match_id: 'df021407-4204-413c-b2da-03a639edad31',
      position: '0',
      is_admin: true,
    },
    {
      user_id: '1',
      match_id: 'df021407-4204-413c-b2da-03a639edad31',
      position: '1',
      is_admin: false,
    },
    {
      user_id: '2',
      match_id: 'b2c5b01d-3371-4911-b45a-528e8fb4aba9',
      position: '0',
      is_admin: true,
    },
    {
      user_id: '1',
      match_id: 'b2c5b01d-3371-4911-b45a-528e8fb4aba9',
      position: '2',
      is_admin: false,
    },
    {
      user_id: '3',
      match_id: 'b2c5b01d-3371-4911-b45a-528e8fb4aba9',
      position: '1',
      is_admin: false,
    },
    {
      user_id: '4',
      match_id: 'b2c5b01d-3371-4911-b45a-528e8fb4aba9',
      position: '3',
      is_admin: false,
    },
  ]);

  await knex('users_users').insert([
    {
      user_id: '1',
      follow_id: '2',
    },
    {
      user_id: '1',
      follow_id: '3',
    },
    {
      user_id: '4',
      follow_id: '1',
    },
  ]);

  await knex('users_centers').insert([
    {
      user_id: '1',
      center_id: 'e9988682-3539-4d37-a620-93056126b9cd',
    },
    {
      user_id: '1',
      center_id: 'd367b332-fe6d-4a06-a9f9-fb5c68b4e5c8',
    },
  ]);

  await knex('users_cities').insert([
    {
      user_id: '1',
      city_id: 'fe59bd04-1abb-4734-8592-e9bb7016a2c8',
    },
    {
      user_id: '1',
      city_id: '16b187e8-a950-49d6-8142-91c3f2c255e8',
    },
  ]);

  await knex('users_chats').insert([
    {
      user_id: '1',
      chat_id: 'c6d14309-0882-4251-8556-c01f2042bc9d',
    },
    {
      user_id: '1',
      chat_id: '212c742a-4af0-4289-9305-3b50b4b68b01',
    },
    {
      user_id: '2',
      chat_id: '212c742a-4af0-4289-9305-3b50b4b68b01',
    },
    {
      user_id: '2',
      chat_id: '40e43fd2-205f-411d-8f69-f68f4edc0126',
    },
    {
      user_id: '3',
      chat_id: '40e43fd2-205f-411d-8f69-f68f4edc0126',
    },
    {
      user_id: '1',
      chat_id: '56e7b579-7e8d-4a9a-8e9c-06e6a6a4b287',
    },
    {
      user_id: '4',
      chat_id: '56e7b579-7e8d-4a9a-8e9c-06e6a6a4b287',
    },
    {
      user_id: '1',
      chat_id: '5d696af8-c1ac-43d0-9877-5824b41a6e04',
    },
    {
      user_id: '2',
      chat_id: '5d696af8-c1ac-43d0-9877-5824b41a6e04',
    },
    {
      user_id: '3',
      chat_id: '5d696af8-c1ac-43d0-9877-5824b41a6e04',
    },
  ]);
};
