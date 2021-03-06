import { Op } from 'sequelize';
import { Auth, Body, Ids, Param, Query, Req, Res } from '../types';
import { pick, clean, pagination } from '../utils';
import { Center, City, User } from '../models';
import { throwError } from '../middleware';
import { findOrFail } from '../services';
import database from '../database';

const getCenter = async (req: Req<Param>, res: Res<Center>) => {
  const { id } = req.params;

  try {
    const center = await findOrFail(Center, {
      where: { id },
    });

    return res.status(200).send(center);
  } catch (err) {
    return throwError('Cannot get center', err);
  }
};

const getCenters = async (
  req: Req<Auth, Query<{ centerIds: Ids; query: string }>>,
  res: Res<ReadonlyArray<Center>>
) => {
  const { query, auth } = req;

  try {
    const centers = await pagination(
      Center,
      {
        where: clean({
          id: query.centerIds,
          [Op.or]: [
            { name: { [Op.iLike]: `%${query.query || ''}%` } },
            { address: { [Op.iLike]: `%${query.query || ''}%` } },
          ],
        }),
        include: [
          { model: City, as: 'city' },
          {
            as: 'users',
            model: User,
            required: false,
            where: clean({ id: auth.uid }),
          },
        ],
      },
      query.page,
      query.pageSize
    );
    return res.status(200).send(centers);
  } catch (err) {
    return throwError('Cannot get centers', err);
  }
};

const postCenter = async (req: Req<Body<Center>>, res: Res<Center>) => {
  const { body } = req;

  try {
    const center = await database.transaction(async (transaction) => {
      const T = await Center.create(
        pick(body, 'name', 'picture', 'address', 'contactUrl', 'bookingUrl'),
        { transaction }
      );

      const city = await findOrFail(City, { where: { id: body.cityId } });

      await T.setCity(city, { transaction });

      return T;
    });

    return res.status(201).send(center);
  } catch (err) {
    return throwError('Cannot create center', err);
  }
};

const putCenter = async (
  req: Req<Body<Partial<Center>>, Param>,
  res: Res<Center>
) => {
  const { params, body } = req;

  try {
    const center = await findOrFail(Center, {
      where: { id: params.id },
    });

    if (body.cityId) {
      const city = await findOrFail(City, {
        where: { id: body.cityId },
      });

      center.setCity(city);
    }

    await center.update(
      pick(body, 'name', 'picture', 'address', 'contactUrl', 'bookingUrl')
    );

    return res.status(200).send(center);
  } catch (err) {
    return throwError('Cannot update center', err);
  }
};

const deleteCenter = async (req: Req<Param>, res: Res<string>) => {
  const { params } = req;

  try {
    const center = await findOrFail(Center, {
      where: { id: params.id },
    });

    await center.destroy();

    return res.status(200).send('Center has been deleted');
  } catch (err) {
    return throwError('Cannot delete center', err);
  }
};

const center = {
  getCenter,
  getCenters,
  postCenter,
  putCenter,
  deleteCenter,
};

export default center;
