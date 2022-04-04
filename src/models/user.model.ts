import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { uuid } from '../utils';

interface Attributes {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture?: string;
  description?: string;
  skill?: '0' | '1' | '2' | '3' | '4' | '5';
  isRightHand?: boolean;
  fcm?: string;
}

class User
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface User extends Attributes, CreationDates {}

export const table = async (sequelize: Sequelize) => {
  await User.init(
    {
      id: uuid,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
          len: [10, 10],
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skill: {
        allowNull: true,
        type: DataTypes.ENUM,
        values: ['0', '1', '2', '3', '4', '5'],
      },
      isRightHand: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      fcm: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, underscored: true }
  );
};

export const associations = () => null;

export default User;
