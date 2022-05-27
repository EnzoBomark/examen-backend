import { Model, Sequelize } from 'sequelize';

class usersCenters extends Model<CreationDates> {}

export const usersCentersTable = async (sequelize: Sequelize) => {
  await usersCenters.init({}, { sequelize, underscored: true });
};

export default usersCenters;
