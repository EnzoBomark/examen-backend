import { conflict } from '@hapi/boom';
import { QueryTypes } from 'sequelize';
import { Chat, User } from '../models';
import database from '../database';

const chatExists = async (users: User[]) => {
  const chats: Array<Chat> = await database.query(
    `
    SELECT DISTINCT c.id
    FROM chats c
    INNER JOIN users_chats pivot ON c.id = pivot.chat_id
    where type = :type
    AND pivot.user_id IN (:users)
    AND (
      SELECT COUNT(pivot_2.chat_id)
      FROM chats c2
      INNER JOIN users_chats pivot_2 ON c2.id = pivot_2.chat_id
      WHERE c2.id = c.id
      GROUP BY pivot_2.chat_id
      ) = :users_num
    GROUP BY c.id
    HAVING COUNT(c.id) = :users_num
  `,
    {
      replacements: {
        users: users.map((user) => user.getDataValue('id')),
        users_num: users.length,
        type: users.length > 2 ? 'group' : 'user',
      },
      type: QueryTypes.SELECT,
    }
  );

  if (chats.length) throw conflict('Chat already exists');
};

export default chatExists;
