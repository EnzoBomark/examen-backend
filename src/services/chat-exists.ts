import { conflict } from '@hapi/boom';
import { Chat, User } from '../models';

const chatExists = async (users: User[]) => {
  const existingChat = await Chat.findOne({
    where: { type: users.length > 2 ? 'group' : 'user' },
    include: [
      {
        model: User,
        as: 'users',
        where: { id: users.map((user) => user.getDataValue('id')) },
      },
    ],
  });

  if (existingChat) throw conflict('Chat already exists');
};

export default chatExists;
