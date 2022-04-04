import UsersCities, { usersCitiesTable } from './user-city.model';
import UsersChats, { usersChatsTable } from './user-chat.model';
import UsersCenters, { usersCentersTable } from './user-center.model';
import UsersChats, { usersChatsTable } from './user-chat.model';
import UsersUsers, { usersUsersTable } from './user-user.model';

export { UsersCities, UsersChats, UsersCenters, UsersUsers };

export const pivots = [
  usersCitiesTable,
  usersCentersTable,
  usersChatsTable,
  usersUsersTable,
];
