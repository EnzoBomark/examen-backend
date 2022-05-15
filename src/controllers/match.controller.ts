import { conflict } from '@hapi/boom';
import { Auth, Body, Ids, Param, Query, Req, Res } from '../types';
import { Center, Chat, Match, User } from '../models';
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
  req: Req<Query<{ matchIds: Ids }>>,
  res: Res<ReadonlyArray<Match>>
) => {
  const { query } = req;

  try {
    const matches = await pagination(
      Match,
      {
        where: clean({ id: query.matchIds }),
        include: { all: true },
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
    const instance = await database.transaction(async (transaction) => {
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
          is_read: false,
        });
      }

      await T.setChat(chat, { transaction });
      await user.addChats([chat], { transaction });

      return T;
    });

    const match = await findOrFail(Match, {
      where: { id: instance.getDataValue('id') },
      include: { all: true },
    });

    return res.status(201).send(match);
  } catch (err) {
    return throwError('Cannot create match', err);
  }
};

const putMatch = async (
  req: Req<Param, Body<Partial<Match>>>,
  res: Res<Match>
) => {
  const { params, body } = req;

  try {
    const match = await findOrFail(Match, { where: { id: params.id } });

    if (body.centerId) {
      const center = await findOrFail(Center, {
        where: { id: body.centerId },
        include: { all: true },
      });

      match.setCenter(center);
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
        'isBooked'
      )
    );

    return res.status(200).send(match);
  } catch (err) {
    return throwError('Cannot update match', err);
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
  deleteMatch,
};

export default match;
