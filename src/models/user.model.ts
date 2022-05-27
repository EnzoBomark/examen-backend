import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { uuid } from '../utils';
import { Center, City, Match, Chat, Notification } from '.';
import { BelongsTo, BelongsToMany, HasMany } from '../types';
import {
  usersCenters,
  usersChats,
  usersCities,
  usersMatches,
  usersUsers,
} from '../pivots';

interface Attributes {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture?: string;
  description?: string;
  birthDate?: string;
  skill?: '0' | '1' | '2' | '3' | '4' | '5';
  isRightHand?: boolean;
  fcm?: string;
}

class User
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface User
  extends Attributes,
    BelongsToMany<'followings', User>,
    BelongsToMany<'followers', User>,
    BelongsToMany<'centers', Center>,
    BelongsToMany<'matches', Match>,
    BelongsToMany<'chats', Chat>,
    BelongsToMany<'cities', City>,
    HasMany<'sendNotices', Notification>,
    HasMany<'notifications', Notification>,
    BelongsTo<'city', City>,
    CreationDates {}

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
      birthDate: {
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

export const associations = () => {
  // Those who the user follows
  User.belongsToMany(User, {
    through: usersUsers,
    foreignKey: 'userId',
    as: 'followings',
  });

  // Those who follows the user
  User.belongsToMany(User, {
    through: usersUsers,
    foreignKey: 'followId',
    as: 'followers',
  });

  User.belongsToMany(Center, {
    through: usersCenters,
    foreignKey: 'userId',
    as: 'centers',
  });

  User.belongsToMany(City, {
    through: usersCities,
    foreignKey: 'userId',
    as: 'cities',
  });

  User.belongsToMany(Match, {
    through: usersMatches,
    foreignKey: 'userId',
    as: 'matches',
  });

  User.belongsToMany(Chat, {
    through: usersChats,
    foreignKey: 'userId',
    as: 'chats',
  });

  User.hasMany(Notification, {
    foreignKey: 'senderId',
    onDelete: 'cascade',
    as: 'sendNotices',
  });

  User.hasMany(Notification, {
    foreignKey: 'receiverId',
    onDelete: 'cascade',
    as: 'notifications',
  });

  User.belongsTo(City, {
    foreignKey: 'cityId',
    as: 'city',
  });
};

export default User;
