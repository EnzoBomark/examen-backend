import { Model, Sequelize } from 'sequelize';

class UsersCities extends Model<CreationDates> {}

export const usersCitiesTable = async (sequelize: Sequelize) => {
  await UsersCities.init({}, { sequelize, underscored: true });
};

export default UsersCities;
