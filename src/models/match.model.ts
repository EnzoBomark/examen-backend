import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { uuid } from '../utils';
import { User, Center, Chat, Notification } from '.';
import { usersMatches } from '../pivots';
import { BelongsTo, BelongsToMany, HasMany, HasOne } from '../types';

interface Attributes {
  id: string;
  dateTime: string;
  type: 'single' | 'double';
  duration: '60' | '90' | '120';
  currency: 'SEK' | 'EUR';
  court?: string;
  price?: number;
  phone?: number;
  teamOneScore?: number;
  teamTwoScore?: number;
  isPublic?: boolean;
  isPlayed?: boolean;
  isBooked?: boolean;
  description?: string;
  centerId?: string;
}

class Match
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface Match
  extends Attributes,
    BelongsToMany<'users', User>,
    HasMany<'notifications', Notification>,
    BelongsTo<'center', Center>,
    HasOne<'chat', Chat>,
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
          notEmpty: true,
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
      description: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          max: 600,
        },
      },
      teamOneScore: {
        allowNull: true,
        type: DataTypes.NUMBER,
      },
      teamTwoScore: {
        allowNull: true,
        type: DataTypes.NUMBER,
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
  Match.belongsToMany(User, {
    through: usersMatches,
    foreignKey: 'matchId',
    as: 'users',
  });

  Match.hasMany(Notification, {
    onDelete: 'cascade',
    as: 'notifications',
  });

  Match.belongsTo(Center, {
    foreignKey: 'centerId',
    as: 'center',
  });

  Match.hasOne(Chat, {
    onDelete: 'cascade',
    foreignKey: 'matchId',
    as: 'chat',
  });
};

export default Match;
