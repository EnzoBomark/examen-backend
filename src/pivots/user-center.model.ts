import { Model, Sequelize } from 'sequelize';

class UsersCenters extends Model<CreationDates> {}

export const usersCentersTable = async (sequelize: Sequelize) => {
  await UsersCenters.init({}, { sequelize, underscored: true });
};

export default UsersCenters;
