import { Match, Notification, User } from '../models';
import { throwError } from '../middleware';
import { findOrFail } from '../services';
import database from '../database';
import { Auth, Body, Param, Req, Res } from '../types';

const postFollowNotification = async (
  req: Req<Auth, Body<Notification>>,
  res: Res<Notification>
) => {
  const { auth, body } = req;

  try {
    const notification = await database.transaction(async (transaction) => {
      const sender = await findOrFail(User, { where: { id: auth.uid } });

      const receiver = await findOrFail(User, {
        where: { id: body.receiverId },
      });

      const T = await Notification.create(
        { type: 'follow', isRead: false },
        { transaction }
      );

      await T.setReceiver(receiver, { transaction });

      await T.setSender(sender, { transaction });

      return T;
    });

    const response = await findOrFail(Notification, {
      where: { id: notification.getDataValue('id') },
      include: { all: true },
    });

    return res.status(200).send(response);
  } catch (err) {
    return throwError('Cannot create follow notification', err);
  }
};

const postInviteNotification = async (
  req: Req<Auth, Body<Notification>>,
  res: Res<Notification>
) => {
  const { auth, body } = req;

  try {
    const notification = await database.transaction(async (transaction) => {
      const sender = await findOrFail(User, { where: { id: auth.uid } });

      const match = await findOrFail(Match, {
        where: { id: body.matchId },
      });

      const receiver = await findOrFail(User, {
        where: { id: body.receiverId },
      });

      const T = await Notification.create(
        { type: 'invite', isRead: false },
        { transaction }
      );

      await T.setMatch(match, { transaction });

      await T.setReceiver(receiver, { transaction });

      await T.setSender(sender, { transaction });

      return T;
    });

    const response = await findOrFail(Notification, {
      where: { id: notification.getDataValue('id') },
      include: { all: true },
    });

    return res.status(200).send(response);
  } catch (err) {
    return throwError('Cannot create invite notification', err);
  }
};

const postResultNotification = async (
  req: Req<Body<Notification>>,
  res: Res<Notification>
) => {
  const { body } = req;

  try {
    const notification = await database.transaction(async (transaction) => {
      const match = await findOrFail(Match, {
        where: { id: body.matchId },
      });

      const receiver = await findOrFail(User, {
        where: { id: body.receiverId },
      });

      const T = await Notification.create(
        { type: 'result', isRead: false },
        { transaction }
      );

      await T.setMatch(match, { transaction });

      await T.setReceiver(receiver, { transaction });

      return T;
    });

    const response = await findOrFail(Notification, {
      where: { id: notification.getDataValue('id') },
      include: { all: true },
    });

    return res.status(200).send(response);
  } catch (err) {
    return throwError('Cannot create result notification', err);
  }
};

const putNotificationReadStatus = async (
  req: Req<Param>,
  res: Res<Notification>
) => {
  const { params } = req;

  try {
    const notification = await findOrFail(Notification, {
      where: { id: params.id },
      include: { all: true },
    });

    await notification.update({ isRead: true });

    return res.status(200).send(notification);
  } catch (err) {
    return throwError('Cannot update notification', err);
  }
};

const notification = {
  postFollowNotification,
  postInviteNotification,
  postResultNotification,
  putNotificationReadStatus,
};

export default notification;
