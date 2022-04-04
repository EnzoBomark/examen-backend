import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { User, Match } from '.';
import { UsersChats } from '../pivots';
import { BelongsTo, BelongsToMany } from '../types';
import { uuid } from '../utils';

interface Attributes {
  id: string;
  type: 'user' | 'group' | 'match';
}

class Chat
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface Chat
  extends Attributes,
    BelongsTo<'match', Match>,
    BelongsToMany<'users', User>,
    CreationDates {}

export const table = async (sequelize: Sequelize) => {
  await Chat.init(
    {
      id: uuid,
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['user', 'group', 'match'],
      },
    },
    { sequelize, underscored: true }
  );
};

export const associations = () => {
  Chat.belongsTo(Match, {
    foreignKey: 'matchId',
    as: 'match',
  });

  Chat.belongsToMany(User, {
    through: UsersChats,
    foreignKey: 'chatId',
    as: 'users',
  });
};

export default Chat;
