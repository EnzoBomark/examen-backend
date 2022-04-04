import { conflict } from '@hapi/boom';
import { throwError } from '../middleware';
import { User } from '../models';
import { findOrFail } from '../services';
import { pick } from '../utils';

const getProfile = async (req: Req<auth>, res: Res<User>) => {
  const { auth } = req;

  try {
    const profile = await findOrFail(User.findOne({ where: { id: auth.uid } }));

    return res.status(200).send(profile);
  } catch (err) {
    return throwError('Cannot get profile', err);
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
    const profile = await findOrFail(User.findOne({ where: { id: auth.uid } }));

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

const user = {
  getProfile,
  postProfile,
  putProfile,
};

export default user;
