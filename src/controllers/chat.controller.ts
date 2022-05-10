import { badData } from '@hapi/boom';
import { Auth, Body, Req, Res } from '../types';
import { User, Chat } from '../models';
import { throwError } from '../middleware';
import { chatExists, findOrFail } from '../services';
import { ChatWithMessages } from '../models/chat.model';
import { prod } from '../config/constant.config';
import database from '../database';
import firebase from '../firebase';

const postChat = async (
  req: Req<Auth, Body<{ userIds: ReadonlyArray<string> | string }>>,
  res: Res<ChatWithMessages>
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

      if (prod) {
        const statusRef = firebase.root
          .database()
          .ref(`/chat_rooms_status/${T.getDataValue('id')}`);

        await Promise.all(
          users.map((user) => {
            return statusRef.push().set({
              uid: user.id,
              is_read: false,
            });
          })
        );
      }

      await T.addUsers(users, { transaction });

      return T;
    });

    const messages: {
      key: string | null;
      uid: string;
      message: string;
      time: string;
    }[] = [];

    const readStatus: { id: string; isRead: boolean }[] = [];

    if (prod) {
      const messagesRef = firebase.root
        .database()
        .ref(`/chat_rooms/${chat.getDataValue('id')}`);

      const messagesSnapShot = await messagesRef
        .orderByKey()
        .limitToLast(1)
        .once('value');

      messagesSnapShot.forEach((message) => {
        messages.push({
          key: message.key,
          uid: message.val().uid,
          message: message.val().message,
          time: message.val().time,
        });
      });

      const statusRef = firebase.root
        .database()
        .ref(`/chat_rooms_status/${chat.getDataValue('id')}`);

      const statusSnapShot = await statusRef.once('value');

      statusSnapShot.forEach((status) => {
        readStatus.push({
          id: status.val().uid,
          isRead: status.val().is_read,
        });
      });
    }

    const chatWithMessages = await findOrFail(Chat, {
      where: { id: chat.id },
      include: [{ all: true }],
    });

    return res
      .status(201)
      .send({ ...chatWithMessages.toJSON(), messages, readStatus });
  } catch (err) {
    throw throwError('Cannot create chat', err);
  }
};

const chat = {
  postChat,
};

export default chat;
