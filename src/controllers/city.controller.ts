import { City, Country } from '../models';
import { throwError } from '../middleware';
import { clean, pagination, pick } from '../utils';
import { findOrFail } from '../services';
import database from '../database';

const getCity = async (req: Req<param>, res: Res<City>) => {
  const { params } = req;

  try {
    const city = await findOrFail(City.findOne({ where: { id: params.id } }));

    return res.status(200).send(city);
  } catch (err) {
    return throwError('Cannot get city', err);
  }
};

const getCities = async (
  req: Req<query<{ cityIds: Ids; countryIds: Ids }>>,
  res: Res<City[]>
) => {
  const { query } = req;

  try {
    const cities = await City.findAll(
      pagination(
        {
          where: clean({ id: query.cityIds }),
          include: [
            {
              model: Country,
              as: 'country',
              where: clean({ id: query.countryIds }),
            },
          ],
        },
        { page: query.page, pageSize: query.pageSize }
      )
    );

    return res.status(200).send(cities);
  } catch (err) {
    return throwError('Cannot get cities', err);
  }
};

const postCity = async (req: Req<body<City>>, res: Res<City>) => {
  const { body } = req;

  try {
    const city = await database.transaction(async (transaction) => {
      const T = await City.create(pick(body, 'name'), { transaction });

      const country = await findOrFail(
        Country.findOne({
          where: { id: body.countryId },
        })
      );

      await T.setCountry(country, { transaction });

      return T;
    });

    return res.status(201).send(city);
  } catch (err) {
    return throwError('Cannot create city', err);
  }
};

const putCity = async (
  req: Req<param, body<Partial<City>>>,
  res: Res<City>
) => {
  const { params, body } = req;

  try {
    const city = await findOrFail(
      City.findOne({
        where: { id: params.id },
      })
    );

    if (body.countryId) {
      const country = await findOrFail(
        Country.findOne({
          where: { id: body.countryId },
        })
      );

      city.setCountry(country);
    }

    await city.update(pick(body, 'name'));

    return res.status(200).send(city);
  } catch (err) {
    return throwError('Cannot update city', err);
  }
};

const deleteCity = async (req: Req<param>, res: Res<string>) => {
  const { params } = req;

  try {
    const city = await findOrFail(City.findOne({ where: { id: params.id } }));

    await city.destroy();

    return res.status(200).send('City has been deleted');
  } catch (err) {
    return throwError('Cannot delete city', err);
  }
};

const city = {
  getCity,
  getCities,
  postCity,
  putCity,
  deleteCity,
};

export default city;
