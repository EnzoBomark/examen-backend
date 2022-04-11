import usersCities, { usersCitiesTable } from './user-city.model';
import usersChats, { usersChatsTable } from './user-chat.model';
import usersCenters, { usersCentersTable } from './user-center.model';
import usersMatches, { usersMatchesTable } from './user-match.model';
import usersUsers, { usersUsersTable } from './user-user.model';

export { usersCities, usersChats, usersCenters, usersMatches, usersUsers };

export const pivots = [
  usersCitiesTable,
  usersCentersTable,
  usersChatsTable,
  usersMatchesTable,
  usersUsersTable,
];
