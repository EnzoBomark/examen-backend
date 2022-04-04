import { Center, Chat, Match, User } from '../models';
import { throwError } from '../middleware';
import { clean, pagination, pick } from '../utils';
import { findOrFail } from '../services';
import database from '../database';

const getMatch = async (req: Req<param>, res: Res<Match>) => {
  const { params } = req;

  try {
    const match = await findOrFail(Match.findOne({ where: { id: params.id } }));

    return res.status(200).send(match);
  } catch (err) {
    return throwError('Cannot get match', err);
  }
};

const getMatches = async (
  req: Req<query<{ matchIds: Ids }>>,
  res: Res<ReadonlyArray<Match>>
) => {
  const { query } = req;

  try {
    const matches = await Match.findAll(
      pagination(
        {
          where: clean({ id: query.matchIds }),
        },
        { page: query.page, pageSize: query.pageSize }
      )
    );

    return res.status(200).send(matches);
  } catch (err) {
    return throwError('Cannot get matches', err);
  }
};

const postMatch = async (req: Req<auth, body<Match>>, res: Res<Match>) => {
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
          'skill',
          'phone',
          'isPublic',
          'isBooked'
        ),
        {
          transaction,
        }
      );

      const user = await findOrFail(User.findOne({ where: { id: auth.uid } }));

      await T.addUsers([user], {
        through: { position: '0', isAdmin: true },
        transaction,
      });

      const center = await findOrFail(
        Center.findOne({
          where: { id: body.centerId },
        })
      );

      await T.setCenter(center, { transaction });

      const chat = await Chat.create({ type: 'match' }, { transaction });
      await T.setChat(chat, { transaction });
      await user.addChats([chat], { transaction });

      return T;
    });

    return res.status(201).send(match);
  } catch (err) {
    return throwError('Cannot create match', err);
  }
};

const putMatch = async (
  req: Req<param, body<Partial<Match>>>,
  res: Res<Match>
) => {
  const { params, body } = req;

  try {
    const match = await findOrFail(Match.findOne({ where: { id: params.id } }));

    if (body.centerId) {
      const center = await findOrFail(
        Center.findOne({
          where: { id: body.centerId },
        })
      );

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
        'skill',
        'phone',
        'result',
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

const deleteMatch = async (req: Req<param>, res: Res<string>) => {
  const { params } = req;

  try {
    const match = await findOrFail(Match.findOne({ where: { id: params.id } }));

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