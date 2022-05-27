import { Model, Sequelize } from 'sequelize';

class usersCities extends Model<CreationDates> {}

export const usersCitiesTable = async (sequelize: Sequelize) => {
  await usersCities.init({}, { sequelize, underscored: true });
};

export default usersCities;
