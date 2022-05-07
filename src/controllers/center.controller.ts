import { Center, City } from '../models';
import { pick, clean, pagination } from '../utils';
import { throwError } from '../middleware';
import { findOrFail } from '../services';
import database from '../database';

const getCenter = async (req: Req<param>, res: Res<Center>) => {
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
  req: Req<query<{ centerIds: Ids; cityIds: Ids }>>,
  res: Res<ReadonlyArray<Center>>
) => {
  const { query } = req;

  try {
    const centers = await pagination(
      Center,
      {
        where: clean({ id: query.centerIds }),
        include: { all: true },
      },
      query.page,
      query.pageSize
    );

    return res.status(200).send(centers);
  } catch (err) {
    return throwError('Cannot get centers', err);
  }
};

const postCenter = async (req: Req<body<Center>>, res: Res<Center>) => {
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
  req: Req<body<Partial<Center>>, param>,
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

const deleteCenter = async (req: Req<param>, res: Res<string>) => {
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
