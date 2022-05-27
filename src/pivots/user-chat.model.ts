import { Model, Sequelize } from 'sequelize';

class usersChats extends Model<CreationDates> {}

export const usersChatsTable = async (sequelize: Sequelize) => {
  await usersChats.init({}, { sequelize, underscored: true });
};

export default usersChats;
