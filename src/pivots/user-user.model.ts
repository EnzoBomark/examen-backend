import { Model, Sequelize } from 'sequelize';

class usersUsers extends Model<CreationDates> {}

export const usersUsersTable = async (sequelize: Sequelize) => {
  await usersUsers.init({}, { sequelize, underscored: true });
};

export default usersUsers;
