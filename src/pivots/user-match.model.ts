import { Model, DataTypes, Sequelize } from 'sequelize';

interface Attributes {
  isAdmin: boolean;
  position: '0' | '1' | '2' | '3';
}

class UsersMatches extends Model<Attributes> implements Attributes {}

interface UsersMatches extends Attributes, CreationDates {}

export const usersMatchesTable = async (sequelize: Sequelize) => {
  await UsersMatches.init(
    {
      position: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['0', '1', '2', '3'],
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { sequelize, underscored: true }
  );
};

export default UsersMatches;
