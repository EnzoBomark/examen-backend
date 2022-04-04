import UsersCities, { usersCitiesTable } from './user-city.model';
import UsersChats, { usersChatsTable } from './user-chat.model';
import UsersCenters, { usersCentersTable } from './user-center.model';
import UsersMatches, { usersMatchesTable } from './user-match.model';
import UsersUsers, { usersUsersTable } from './user-user.model';

export { UsersCities, UsersChats, UsersCenters, UsersMatches, UsersUsers };

export const pivots = [
  usersCitiesTable,
  usersCentersTable,
  usersChatsTable,
  usersMatchesTable,
  usersUsersTable,
];
