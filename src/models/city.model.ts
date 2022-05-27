import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { User, Center, Country } from '.';
import { usersCities } from '../pivots';
import { BelongsTo, BelongsToMany, HasMany } from '../types';
import { uuid } from '../utils';

interface Attributes {
  id: string;
  name: string;
  countryId?: string;
}

class City
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface City
  extends Attributes,
    HasMany<'centers', Center>,
    BelongsTo<'country', Country>,
    BelongsToMany<'users', User>,
    CreationDates {}

export const table = async (sequelize: Sequelize) => {
  await City.init(
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
    },
    { sequelize, underscored: true }
  );
};

export const associations = () => {
  City.belongsTo(Country, {
    foreignKey: 'countryId',
    as: 'country',
  });

  City.hasMany(Center, {
    foreignKey: 'cityId',
    onDelete: 'cascade',
    as: 'centers',
  });

  City.belongsToMany(User, {
    through: usersCities,
    foreignKey: 'cityId',
    as: 'users',
  });
};

export default City;
