import { Model, Sequelize } from 'sequelize';

class UsersChats extends Model<CreationDates> {}

export const usersChatsTable = async (sequelize: Sequelize) => {
  await UsersChats.init({}, { sequelize, underscored: true });
};

export default UsersChats;
