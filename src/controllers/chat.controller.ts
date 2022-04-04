import { badData } from '@hapi/boom';
import { User, Chat } from '../models';
import { chatExists } from '../services';
import { throwError } from '../middleware';
import database from '../database';

const postChat = async (
  req: Req<auth, body<{ userIds: ReadonlyArray<string> | string }>>,
  res: Res<Chat>
) => {
  const { auth, body } = req;

  try {
    const users = await User.findAll({
      where: { id: [auth.uid].concat(body.userIds) },
    });

    if (users.length <= 1) throw badData('No users provided');

    await chatExists(users);

    const chat = await database.transaction(async (transaction) => {
      const T = await Chat.create(
        { type: users.length > 2 ? 'group' : 'user' },
        { include: [{ model: User, as: 'users' }], transaction }
      );

      await T.addUsers(users, { transaction });

      return T;
    });

    return res.status(201).send(chat);
  } catch (err) {
    throw throwError('Cannot create chat', err);
  }
};

const chat = {
  postChat,
};

export default chat;
