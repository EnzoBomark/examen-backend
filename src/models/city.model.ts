import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { Country } from '.';
import { BelongsTo } from '../types';
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
    BelongsTo<'country', Country>,
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
};

export default City;
