import { badImplementation } from '@hapi/boom';

import firebase from '../firebase';
import { User } from '../models';

const sendToUsers = async (users: User[], title: string, message: string) => {
  const tokens = users.reduce((acc: string[], user) => {
    const token = user.getDataValue('fcm');
    return token ? [...acc, token] : acc;
  }, []);

  if (!tokens.length) return;

  try {
    firebase.root.messaging().sendToDevice(tokens, {
      notification: {
        title,
        body: message,
        sound: 'default',
      },
      data: {
        message,
      },
    });
  } catch (err) {
    throw badImplementation((err as Error).message);
  }
};

const sendToUser = async (user: User, title: string, message: string) => {
  const token = user.getDataValue('fcm');

  if (!token) return;

  try {
    firebase.root.messaging().sendToDevice(token, {
      notification: {
        title,
        body: message,
        sound: 'default',
      },
      data: {
        message,
      },
    });
  } catch (err) {
    throw badImplementation((err as Error).message);
  }
};

const cloudMessage = {
  sendToUsers,
  sendToUser,
};

export default cloudMessage;
