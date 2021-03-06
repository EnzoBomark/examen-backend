import { conflict } from '@hapi/boom';
import { Op } from 'sequelize';
import { Auth, Body, Ids, Param, Query, Req, Res } from '../types';
import { Center, Chat, Match, User, Notification } from '../models';
import { throwError } from '../middleware';
import { clean, pagination, pick } from '../utils';
import { findOrFail } from '../services';
import database from '../database';
import firebase from '../firebase';
import { prod } from '../config/constant.config';

const getMatch = async (req: Req<Param>, res: Res<Match>) => {
  const { params } = req;

  try {
    const match = await findOrFail(Match, {
      where: { id: params.id },
      include: { all: true },
    });

    return res.status(200).send(match);
  } catch (err) {
    return throwError('Cannot get match', err);
  }
};

const getMatches = async (
  req: Req<Query<{ matchIds: Ids; name: string }>>,
  res: Res<ReadonlyArray<Match>>
) => {
  const { query } = req;

  try {
    const matches = await pagination(
      Match,
      {
        where: clean({ id: query.matchIds }),
        include: [
          { model: User, as: 'users' },
          { model: Notification, as: 'notifications' },
          {
            model: Center,
            as: 'center',
            where: {
              name: { [Op.iLike]: `%${query.name || ''}%` },
            },
          },
          { model: Chat, as: 'chat' },
        ],
      },
      query.page,
      query.pageSize
    );

    return res.status(200).send(matches);
  } catch (err) {
    return throwError('Cannot get matches', err);
  }
};

const postMatch = async (req: Req<Auth, Body<Match>>, res: Res<Match>) => {
  const { auth, body } = req;

  try {
    const match = await database.transaction(async (transaction) => {
      const T = await Match.create(
        pick(
          body,
          'dateTime',
          'type',
          'court',
          'duration',
          'currency',
          'price',
          'phone',
          'isPublic',
          'isBooked'
        ),
        {
          include: { all: true },
          transaction,
        }
      );

      const user = await findOrFail(User, { where: { id: auth.uid } });

      await T.addUsers([user], {
        through: { position: '0', isAdmin: true },
        transaction,
      });

      const center = await findOrFail(Center, {
        where: { id: body.centerId },
      });

      await T.setCenter(center, { transaction });

      const chat = await Chat.create({ type: 'match' }, { transaction });

      if (prod) {
        const statusRef = firebase.root
          .database()
          .ref(`/chat_rooms_status/${chat.getDataValue('id')}`);

        await statusRef.push().set({
          uid: user.getDataValue('id'),
          is_read: true,
        });
      }

      await T.setChat(chat, { transaction });
      await user.addChats([chat], { transaction });

      return T;
    });

    const chat = await match.getChat({ include: { all: true } });

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

    const chatWithMessages = {
      ...chat.toJSON(),
      messages,
      readStatus,
    };

    const response = await findOrFail(Match, {
      where: { id: match.getDataValue('id') },
      include: { all: true },
    });

    return res.status(201).send({
      ...response.toJSON(),
      chat: chatWithMessages,
    } as unknown as Match);
  } catch (err) {
    return throwError('Cannot create match', err);
  }
};

const putMatch = async (
  req: Req<Auth, Param, Body<Partial<Match>>>,
  res: Res<Match>
) => {
  const { auth, params, body } = req;

  try {
    const match = await findOrFail(Match, { where: { id: params.id } });

    const users = (await match.getUsers()) as Array<
      User & { usersMatches: { isAdmin: boolean; userId: string } }
    >;

    const matchUserInfo = users.find((u) => u.usersMatches.userId === auth.uid);

    if (!matchUserInfo || !matchUserInfo.usersMatches.isAdmin)
      throw conflict('You are not the admin of this match');

    if (body.centerId) {
      const center = await findOrFail(Center, {
        where: { id: body.centerId },
      });

      await match.setCenter(center);
    }

    await match.update(
      pick(
        body,
        'dateTime',
        'court',
        'duration',
        'currency',
        'price',
        'phone',
        'teamOneScore',
        'teamTwoScore',
        'isPlayed',
        'isPublic',
        'isBooked',
        'description'
      )
    );

    const response = await findOrFail(Match, {
      where: { id: params.id },
      include: { all: true },
    });

    return res.status(200).send(response);
  } catch (err) {
    return throwError('Cannot update match', err);
  }
};

const putKickMatchPlayer = async (
  req: Req<Auth, Param<{ userId: string }>>,
  res: Res<Match>
) => {
  const { auth, params } = req;

  try {
    const match = await findOrFail(Match, { where: { id: params.id } });

    const player = await findOrFail(User, { where: { id: params.userId } });

    const users = (await match.getUsers()) as Array<
      User & { usersMatches: { isAdmin: boolean; userId: string } }
    >;

    const matchUserInfo = users.find((u) => u.usersMatches.userId === auth.uid);

    if (!matchUserInfo || !matchUserInfo.usersMatches.isAdmin)
      throw conflict('You are not the admin of this match');

    await database.transaction(async (transaction) => {
      const chat = await match.getChat();

      await player.removeChats([chat], { transaction });

      await player.removeMatches([match], { transaction });

      const statusRef = firebase.root
        .database()
        .ref(`/chat_rooms_status/${chat.getDataValue('id')}`);

      statusRef.once('value', (chatUsers) => {
        chatUsers.forEach((user) => {
          if (user.val().uid === auth.uid) user.ref.remove();
        });
      });
    });

    return res.status(200).send(match);
  } catch (err) {
    return throwError('Cannot delete match', err);
  }
};

const deleteMatch = async (req: Req<Auth, Param>, res: Res<string>) => {
  const { auth, params } = req;

  try {
    const match = await findOrFail(Match, { where: { id: params.id } });

    const users = (await match.getUsers()) as Array<
      User & { usersMatches: { isAdmin: boolean; userId: string } }
    >;

    const matchUserInfo = users.find((u) => u.usersMatches.userId === auth.uid);

    if (!matchUserInfo || !matchUserInfo.usersMatches.isAdmin)
      throw conflict('You are not the admin of this match');

    if (prod) {
      const chat = await match.getChat();

      const statusRef = firebase.root
        .database()
        .ref(`/chat_rooms_status/${chat.getDataValue('id')}`);

      await statusRef.remove();
    }

    await match.destroy();

    return res.status(200).send('Match has been deleted');
  } catch (err) {
    return throwError('Cannot delete match', err);
  }
};

const match = {
  getMatch,
  getMatches,
  postMatch,
  putMatch,
  putKickMatchPlayer,
  deleteMatch,
};

export default match;
