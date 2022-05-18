import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

import { uuid } from '../utils';
import { User, Match } from '.';
import { BelongsTo } from '../types';

interface Attributes {
  id: string;
  type: 'follow' | 'invite' | 'result';
  isRead: boolean;
  matchId?: string;
  receiverId?: string;
}

class Notification
  extends Model<Attributes, Optional<Attributes, 'id'>>
  implements Attributes {}

interface Notification
  extends Attributes,
    BelongsTo<'receiver', User>,
    BelongsTo<'sender', User>,
    BelongsTo<'match', Match>,
    CreationDates {}

export const table = async (sequelize: Sequelize) => {
  await Notification.init(
    {
      id: uuid,
      type: {
        type: DataTypes.ENUM,
        values: ['invite', 'follow', 'result'],
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    { sequelize, underscored: true }
  );
};

export const associations = () => {
  Notification.belongsTo(User, {
    foreignKey: 'receiverId',
    as: 'receiver',
  });

  Notification.belongsTo(User, {
    foreignKey: 'senderId',
    as: 'sender',
  });

  Notification.belongsTo(Match, {
    foreignKey: 'matchId',
    as: 'match',
  });
};

export default Notification;
