import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { City, User } from '.';
import { UsersCenters } from '../pivots';
import { BelongsTo, BelongsToMany } from '../types';
import { uuid } from '../utils';

interface Attributes {
  id: string;
  name: string;
  picture: string;
  address: string;
  contactUrl: string;
  bookingUrl: string;
  cityId?: string;
}

class Center
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface Center
  extends Attributes,
    BelongsTo<'city', City>,
    BelongsToMany<'users', User>,
    CreationDates {}

export const table = async (sequelize: Sequelize) => {
  await Center.init(
    {
      id: uuid,
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      contactUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isUrl: true,
        },
      },
      bookingUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isUrl: true,
        },
      },
    },
    { sequelize, underscored: true }
  );
};

export const associations = () => {
  Center.belongsTo(City, {
    foreignKey: 'cityId',
    as: 'city',
  });

  Center.belongsToMany(User, {
    through: UsersCenters,
    foreignKey: 'centerId',
    as: 'users',
  });
};

export default Center;
