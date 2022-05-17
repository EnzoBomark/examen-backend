import { conflict } from '@hapi/boom';
import firebase from '../firebase';
import { Auth, Body, Param, Query, Req, Res } from '../types';
import { throwError } from '../middleware';
import { Center, Chat, City, Match, User } from '../models';
import { ChatWithMessages } from '../models/chat.model';
import { cloudMessage, findOrFail } from '../services';
import { association, clean, pick } from '../utils';
import { prod } from '../config/constant.config';
import database from '../database';

const getProfile = async (req: Req<Auth>, res: Res<User>) => {
  const { auth } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    return res.status(200).send(profile);
  } catch (err) {
    return throwError('Cannot get profile', err);
  }
};

const getProfileChats = async (
  req: Req<Auth, Query>,
  res: Res<ChatWithMessages[]>
) => {
  const { auth } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const chats = await profile.getChats(
      association({ include: [{ all: true }] })
    );

    const chatsWithMessages = await Promise.all(
      chats.map(async (chat) => {
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

        return {
          ...chat.toJSON(),
          messages,
          readStatus,
        };
      })
    );

    return res.status(200).send(chatsWithMessages);
  } catch (err) {
    return throwError('Cannot get profile chats', err);
  }
};

const getProfileFollows = async (
  req: Req<Auth, Query>,
  res: Res<ReadonlyArray<User>>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const follows = await profile.getFollowings(
      association(
        {
          include: [
            {
              as: 'followers',
              model: User,
              required: false,
              where: clean({ id: auth.uid }),
            },
          ],
        },
        query.page,
        query.pageSize
      )
    );

    return res.status(200).send(follows);
  } catch (err) {
    return throwError('Cannot get profile followings', err);
  }
};

const getProfileFollowers = async (
  req: Req<Auth, Query>,
  res: Res<ReadonlyArray<User>>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const followers = await profile.getFollowers(
      association(
        {
          include: [
            {
              as: 'followers',
              model: User,
              required: false,
              where: clean({ id: auth.uid }),
            },
          ],
        },
        query.page,
        query.pageSize
      )
    );

    return res.status(200).send(followers);
  } catch (err) {
    return throwError('Cannot get profile followers', err);
  }
};

const getProfileMatches = async (
  req: Req<Auth, Query>,
  res: Res<ReadonlyArray<Match>>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const matches = await profile.getMatches(
      association({ include: [{ all: true }] }, query.page, query.pageSize)
    );

    return res.status(200).send(matches);
  } catch (err) {
    return throwError('Cannot get profile matches', err);
  }
};

const getProfileCenters = async (
  req: Req<Auth, Query>,
  res: Res<ReadonlyArray<Center>>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const centers = await profile.getCenters(
      association({ include: [{ all: true }] }, query.page, query.pageSize)
    );

    return res.status(200).send(centers);
  } catch (err) {
    return throwError('Cannot get profile centers', err);
  }
};

const getProfileCities = async (
  req: Req<Auth, Query>,
  res: Res<ReadonlyArray<City>>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const cities = await profile.getCities(
      association({ include: [{ all: true }] }, query.page, query.pageSize)
    );

    return res.status(200).send(cities);
  } catch (err) {
    return throwError('Cannot get profile cities', err);
  }
};

const postProfile = async (req: Req<Auth, Body<User>>, res: Res<User>) => {
  const { auth, body } = req;

  try {
    const user = await User.findOne({ where: { email: body.email } });

    if (user) throw conflict('Email already exists');

    const profile = await User.create({
      id: auth.uid,
      ...pick(body, 'name', 'phone', 'email'),
    });

    return res.status(201).send(profile);
  } catch (err) {
    return throwError('Cannot create profile', err);
  }
};

const putProfile = async (
  req: Req<Auth, Body<Partial<User>>>,
  res: Res<User>
) => {
  const { auth, body } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    await profile.update(
      pick(
        body,
        'name',
        'phone',
        'email',
        'skill',
        'description',
        'birthDate',
        'isRightHand',
        'picture',
        'fcm'
      )
    );

    return res.status(200).send(profile);
  } catch (err) {
    return throwError('Cannot update profile', err);
  }
};

const putProfileMainCity = async (req: Req<Auth, Param>, res: Res<City>) => {
  const { auth, params } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const city = await findOrFail(City, { where: { id: params.id } });

    profile.setCity(city);

    return res.status(200).send(city);
  } catch (err) {
    return throwError('Cannot update profile main city', err);
  }
};

const putProfileChat = async (req: Req<Auth, Param>, res: Res<Chat>) => {
  const { auth, params } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const chat = await findOrFail(Chat, { where: { id: params.id } });

    const isRelationExisting = await profile.hasChats([chat]);

    const statusRef = firebase.root
      .database()
      .ref(`/chat_rooms_status/${chat.getDataValue('id')}`);

    if (!isRelationExisting) {
      await profile.addChats([chat]);

      statusRef.push().set({
        uid: auth.uid,
        is_read: true,
      });
    }

    if (isRelationExisting) {
      await profile.removeChats([chat]);

      statusRef.once('value', (users) => {
        users.forEach((user) => {
          if (user.val().uid === auth.uid) user.ref.remove();
        });
      });
    }

    return res.status(200).send(chat);
  } catch (err) {
    return throwError('Cannot update profile chats', err);
  }
};

const putProfileFollow = async (req: Req<Auth, Param>, res: Res<User>) => {
  const { auth, params } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const followee = await findOrFail(User, { where: { id: params.id } });

    const isRelationExisting = await profile.hasFollowings([followee]);

    if (!isRelationExisting) {
      await profile.addFollowings([followee]);

      await cloudMessage.sendToUser(
        followee,
        'New follower!',
        `${profile.getDataValue('name')} started following you`
      );
    }

    if (isRelationExisting) {
      await profile.removeFollowings([followee]);
    }

    const response = await findOrFail(User, {
      where: { id: params.id },
      include: [
        {
          as: 'followers',
          model: User,
          required: false,
          where: clean({ id: auth.uid }),
        },
      ],
    });

    return res.status(200).send(response);
  } catch (err) {
    return throwError('Cannot update profile follow', err);
  }
};

const putProfileCenter = async (req: Req<Auth, Param>, res: Res<Center>) => {
  const { auth, params } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const center = await findOrFail(Center, { where: { id: params.id } });

    const isRelationExisting = await profile.hasCenters([center]);

    if (!isRelationExisting) await profile.addCenters([center]);

    if (isRelationExisting) await profile.removeCenters([center]);

    const response = await findOrFail(Center, {
      where: { id: params.id },
      include: [
        { model: City, as: 'city' },
        {
          as: 'users',
          model: User,
          required: false,
          where: clean({ id: auth.uid }),
        },
      ],
    });

    return res.status(200).send(response);
  } catch (err) {
    return throwError('Cannot update profile center', err);
  }
};

const putProfileMatch = async (
  req: Req<Auth, Param, Body<{ position: string }>>,
  res: Res<Match>
) => {
  const { auth, params, body } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const match = await findOrFail(Match, { where: { id: params.id } });

    const isRelationExisting = await profile.hasMatches([match]);

    if (!isRelationExisting) {
      if (
        (match.getDataValue('type') === 'double' &&
          (await match.countUsers()) > 3) ||
        (match.getDataValue('type') === 'single' &&
          (await match.countUsers()) > 1)
      ) {
        throw conflict('Match is full');
      }

      const users = (await match.getUsers()) as Array<
        User & { usersMatches: { position: string } }
      >;

      if (users.some((u) => u.usersMatches.position === body.position)) {
        throw conflict(`Position ${body.position} isn't available`);
      }

      await database.transaction(async (transaction) => {
        await profile.addMatches([match], {
          through: { position: body.position },
          transaction,
        });

        const chat = await match.getChat();

        const statusRef = firebase.root
          .database()
          .ref(`/chat_rooms_status/${chat.getDataValue('id')}`);

        statusRef.push().set({
          uid: auth.uid,
          is_read: true,
        });

        await profile.addChats([chat], { transaction });
      });
    }

    if (isRelationExisting) {
      await database.transaction(async (transaction) => {
        const chat = await match.getChat();

        await profile.removeChats([chat], { transaction });

        await profile.removeMatches([match], { transaction });

        const statusRef = firebase.root
          .database()
          .ref(`/chat_rooms_status/${chat.getDataValue('id')}`);

        statusRef.once('value', (users) => {
          users.forEach((user) => {
            if (user.val().uid === auth.uid) user.ref.remove();
          });
        });
      });
    }

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
      where: { id: params.id },
      include: { all: true },
    });

    return res.status(200).send({
      ...response.toJSON(),
      chat: chatWithMessages,
    } as unknown as Match);
  } catch (err) {
    return throwError('Cannot update profile match', err);
  }
};

const user = {
  getProfile,
  getProfileChats,
  getProfileFollows,
  getProfileFollowers,
  getProfileMatches,
  getProfileCenters,
  getProfileCities,
  postProfile,
  putProfile,
  putProfileMainCity,
  putProfileChat,
  putProfileFollow,
  putProfileCenter,
  putProfileMatch,
};

export default user;
