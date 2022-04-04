import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { uuid } from '../utils';
import { User, Center, Chat } from '.';
import { UsersMatches } from '../pivots';
import { BelongsTo, BelongsToMany, HasOne } from '../types';

interface Attributes {
  id: string;
  dateTime: string;
  type: 'single' | 'double';
  duration?: '60' | '90' | '120';
  currency: 'SEK' | 'EUR';
  skill?: '0' | '1' | '2' | '3' | '4' | '5';
  court?: string;
  price?: number;
  phone?: number;
  result?: string;
  isPublic?: boolean;
  isPlayed?: boolean;
  isBooked?: boolean;
  centerId?: string;
}

class Match
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface Match
  extends Attributes,
    BelongsTo<'center', Center>,
    HasOne<'chat', Chat>,
    BelongsToMany<'users', User>,
    CreationDates {}

export const table = async (sequelize: Sequelize) => {
  await Match.init(
    {
      id: uuid,
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['single', 'double'],
      },
      dateTime: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
        },
      },
      court: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      duration: {
        allowNull: true,
        type: DataTypes.ENUM,
        values: ['60', '90', '120'],
        defaultValue: '90',
      },
      price: {
        allowNull: true,
        type: DataTypes.FLOAT,
        validate: {
          isNumeric: true,
        },
      },
      currency: {
        allowNull: true,
        type: DataTypes.ENUM,
        values: ['SEK', 'EUR'],
        defaultValue: 'SEK',
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
        },
      },
      result: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      skill: {
        allowNull: true,
        type: DataTypes.ENUM,
        values: ['0', '1', '2', '3', '4', '5'],
      },
      isPublic: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isBooked: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isPlayed: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    { sequelize, underscored: true }
  );
};

export const associations = () => {
  Match.belongsTo(Center, {
    foreignKey: 'centerId',
    as: 'center',
  });

  Match.hasOne(Chat, {
    onDelete: 'cascade',
    foreignKey: 'matchId',
    as: 'chat',
  });

  Match.belongsToMany(User, {
    through: UsersMatches,
    foreignKey: 'matchId',
    as: 'users',
  });
};

export default Match;
