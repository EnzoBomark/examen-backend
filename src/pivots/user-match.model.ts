import { Model, DataTypes, Sequelize } from 'sequelize';

interface Attributes {
  isAdmin: boolean;
  position: '0' | '1' | '2' | '3';
}

class usersMatches extends Model<Attributes> implements Attributes {}

interface usersMatches extends Attributes, CreationDates {}

export const usersMatchesTable = async (sequelize: Sequelize) => {
  await usersMatches.init(
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

export default usersMatches;
