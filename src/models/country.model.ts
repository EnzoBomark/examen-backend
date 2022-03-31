import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { uuid } from '../utils';
import { City } from '.';
import { HasMany } from '../types';

interface Attributes {
  id: string;
  name: string;
}
class Country
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface Country extends Attributes, HasMany<'cities', City>, CreationDates {}

export const table = async (sequelize: Sequelize) => {
  await Country.init(
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

export const associations = async () => {
  Country.hasMany(City, {
    foreignKey: 'countryId',
    onDelete: 'cascade',
    as: 'cities',
  });
};

export default Country;
