import { conflict } from '@hapi/boom';
import firebase from '../firebase';
import { throwError } from '../middleware';
import { Chat, User } from '../models';
import { cloudMessage, findOrFail } from '../services';
import { association, pick } from '../utils';

const getProfile = async (req: Req<auth>, res: Res<User>) => {
  const { auth } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    return res.status(200).send(profile);
  } catch (err) {
    return throwError('Cannot get profile', err);
  }
};

type Message = {
  key: string | null;
  uid: string;
  message: string;
  time: string;
};

type ReadStatus = {
  id: string;
  isRead: boolean;
};

type ChatWithMessages = {
  messages: Message[];
  readStatus: ReadStatus[];
  id: string;
  type: 'match' | 'group' | 'user';
};

const getProfileChats = async (
  req: Req<auth, query>,
  res: Res<ChatWithMessages[]>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const chats = await profile.getChats(
      association({ include: [{ all: true }] }, query.page, query.pageSize)
    );

    const chatsWithMessages = await Promise.all(
      chats.map(async (chat) => {
        const messagesRef = firebase.root
          .database()
          .ref(`/chat_rooms/${chat.getDataValue('id')}`);

        const messagesSnapShot = await messagesRef
          .orderByKey()
          .limitToLast(1)
          .once('value');

        const messages: {
          key: string | null;
          uid: string;
          message: string;
          time: string;
        }[] = [];

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

        const readStatus: { id: string; isRead: boolean }[] = [];

        statusSnapShot.forEach((status) => {
          readStatus.push({
            id: status.val().uid,
            isRead: status.val().is_read,
          });
        });

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
  req: Req<auth, query>,
  res: Res<ReadonlyArray<User>>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const follows = await profile.getFollowings(
      association({ include: [{ all: true }] }, query.page, query.pageSize)
    );

    return res.status(200).send(follows);
  } catch (err) {
    return throwError('Cannot get profile followings', err);
  }
};

const getProfileFollowers = async (
  req: Req<auth, query>,
  res: Res<ReadonlyArray<User>>
) => {
  const { auth, query } = req;

  try {
    const profile = await findOrFail(User, { where: { id: auth.uid } });

    const followers = await profile.getFollowers(
      association({ include: [{ all: true }] }, query.page, query.pageSize)
    );

    return res.status(200).send(followers);
  } catch (err) {
    return throwError('Cannot get profile followers', err);
  }
};

const postProfile = async (req: Req<auth, body<User>>, res: Res<User>) => {
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
  req: Req<auth, body<Partial<User>>>,
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

const putProfileChat = async (req: Req<auth, param>, res: Res<Chat>) => {
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

const putProfileFollow = async (req: Req<auth, param>, res: Res<User>) => {
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

    return res.status(200).send(profile);
  } catch (err) {
    return throwError('Cannot update profile follow', err);
  }
};

const user = {
  getProfile,
  getProfileChats,
  getProfileFollows,
  getProfileFollowers,
  postProfile,
  putProfile,
  putProfileChat,
  putProfileFollow,
};

export default user;
