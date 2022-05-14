import { Op } from 'sequelize';
import { Auth, Ids, Param, Query, Req, Res } from '../types';
import { throwError } from '../middleware';
import { Center, City, Match, User } from '../models';
import { findOrFail } from '../services';
import { association, clean, pagination } from '../utils';

const getUser = async (req: Req<Auth, Param>, res: Res<User>) => {
  const { params, auth } = req;

  try {
    const user = await findOrFail(User, {
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

const getUserHistory = async (req: Req<Param, Query>, res: Res<Match[]>) => {
  const { params, query } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const matches = await user.getMatches(
      association(
        {
          where: { isPlayed: true },
          include: [
            {
              as: 'users',
              model: User,
            },
            {
              as: 'center',
              model: Center,
            },
          ],
        },
        query.page,
        query.pageSize
      )
    );

    return res.status(200).send(matches);
  } catch (err) {
    return throwError('Cannot get match history', err);
  }
};

const getUserHistoryCount = async (
  req: Req<Param>,
  res: Res<{ count: number }>
) => {
  const { params } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const count = await user.countMatches({
      where: { isPlayed: true },
    });

    return res.status(200).send({ count });
  } catch (err) {
    return throwError('Cannot get match history', err);
  }
};

const getUserUpcoming = async (req: Req<Param, Query>, res: Res<Match[]>) => {
  const { params, query } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const matches = await user.getMatches(
      association(
        {
          where: { isPlayed: false },
          include: [
            {
              as: 'users',
              model: User,
            },
            {
              as: 'center',
              model: Center,
            },
          ],
        },
        query.page,
        query.pageSize
      )
    );

    return res.status(200).send(matches);
  } catch (err) {
    return throwError('Cannot get upcoming matches', err);
  }
};

const getUserUpcomingCount = async (
  req: Req<Param>,
  res: Res<{ count: number }>
) => {
  const { params } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const count = await user.countMatches({
      where: { isPlayed: true },
    });

    return res.status(200).send({ count });
  } catch (err) {
    return throwError('Cannot get match history', err);
  }
};

const getUserWinRate = async (
  req: Req<Auth, Param>,
  res: Res<{ winRate: number }>
) => {
  const { params, auth } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const matches = await user.getMatches(
      association(
        {
          where: {
            isPlayed: true,
            teamOneScore: { [Op.ne]: null },
            teamTwoScore: { [Op.ne]: null },
          },
          include: [
            {
              as: 'users',
              model: User,
            },
            {
              as: 'center',
              model: Center,
            },
          ],
        },
        0,
        100
      )
    );

    const total = matches.length;

    const wins = matches.reduce((acc: number, curr) => {
      const match = curr.toJSON() as Required<Match> & { users: User[] };

      const matchUserInfo = match.users.find((u) => u.id === auth.uid);

      if (!matchUserInfo) return acc;

      const { position } = (
        matchUserInfo as User & { usersMatches: { position: string } }
      ).usersMatches;

      const isTeamOneWinners = match.teamOneScore > match.teamTwoScore;

      const teamOnePositions = match.type === 'single' ? ['0'] : ['0', '1'];

      const isPlayerInTeamOne = teamOnePositions.includes(position);

      return isTeamOneWinners && isPlayerInTeamOne ? acc + 1 : acc;
    }, 0);

    const winRate = Math.round((wins / total) * 100);

    return res.status(200).send({ winRate });
  } catch (err) {
    return throwError('Cannot get match history', err);
  }
};

const getUserFollows = async (
  req: Req<Auth, Query, Param>,
  res: Res<User[]>
) => {
  const { auth, params, query } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const follows = await user.getFollowings(
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
    return throwError('Cannot get user followings', err);
  }
};

const getUserFollowsCount = async (
  req: Req<Param>,
  res: Res<{ count: number }>
) => {
  const { params } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const count = await user.countFollowings();

    return res.status(200).send({ count });
  } catch (err) {
    return throwError('Cannot get user followings', err);
  }
};

const getUserFollowers = async (
  req: Req<Auth, Query, Param>,
  res: Res<User[]>
) => {
  const { auth, params, query } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const followers = await user.getFollowers(
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
    return throwError('Cannot get user followers', err);
  }
};

const getUserFollowersCount = async (
  req: Req<Param>,
  res: Res<{ count: number }>
) => {
  const { params } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const count = await user.countFollowers();

    return res.status(200).send({ count });
  } catch (err) {
    return throwError('Cannot get user followers', err);
  }
};

const getUserCenters = async (req: Req<Query, Param>, res: Res<Center[]>) => {
  const { params, query } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const centers = await user.getCenters(
      association({}, query.page, query.pageSize)
    );

    return res.status(200).send(centers);
  } catch (err) {
    return throwError('Cannot get user centers', err);
  }
};

const getUserCentersCount = async (
  req: Req<Param>,
  res: Res<{ count: number }>
) => {
  const { params } = req;

  try {
    const user = await findOrFail(User, { where: { id: params.id } });

    const count = await user.countCenters();

    return res.status(200).send({ count });
  } catch (err) {
    return throwError('Cannot get user centers', err);
  }
};

const user = {
  getUser,
  getUsers,
  getUserHistory,
  getUserHistoryCount,
  getUserUpcoming,
  getUserUpcomingCount,
  getUserWinRate,
  getUserFollows,
  getUserFollowsCount,
  getUserFollowers,
  getUserFollowersCount,
  getUserCenters,
  getUserCentersCount,
};

export default user;
