import { Op } from 'sequelize';
import { Auth, Ids, Param, Query, Req, Res } from '../types';
import { throwError } from '../middleware';
import { Center, City, User } from '../models';
import { findOrFail } from '../services';
import { clean, pagination } from '../utils';

const getUser = async (req: Req<Param>, res: Res<User>) => {
  const { params } = req;

  try {
    const user = await findOrFail(User, {
      where: { id: params.id },
      include: [
        { model: User, as: 'followings' },
        { model: User, as: 'followers' },
        { model: Center, as: 'centers' },
        { model: City, as: 'cities' },
      ],
    });

    return res.status(200).send(user);
  } catch (err) {
    return throwError('Cannot get user', err);
  }
};

const getUsers = async (
  req: Req<Auth, Query<{ userIds: Ids; cityIds: Ids; name: string }>>,
  res: Res<ReadonlyArray<User>>
) => {
  const { query, auth } = req;

  try {
    const users = await pagination(
      User,
      {
        where: clean({
          id: query.userIds,
          name: { [Op.iLike]: `%${query.name || ''}%` },
        }),
        include: [
          {
            as: 'cities',
            model: City,
            required: false,
            where: clean({ id: query.cityIds }),
          },
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
    );

    return res
      .status(200)
      .send(users.filter((u) => u.getDataValue('id') !== auth.uid));
  } catch (err) {
    return throwError('Cannot get users', err);
  }
};

const user = {
  getUser,
  getUsers,
};

export default user;
