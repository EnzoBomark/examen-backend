import { Model, Sequelize } from 'sequelize';

class UsersUsers extends Model<CreationDates> {}

export const usersUsersTable = async (sequelize: Sequelize) => {
  await UsersUsers.init({}, { sequelize, underscored: true });
};

export default UsersUsers;
