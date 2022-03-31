import { Country } from '../models';
import { throwError } from '../middleware';
import { clean, pagination, pick } from '../utils';
import { findOrFail } from '../services';

const getCountry = async (req: Req<param>, res: Res<Country>) => {
  const { params } = req;

  try {
    const country = await findOrFail(
      Country.findOne({
        where: { id: params.id },
      })
    );

    return res.status(200).send(country);
  } catch (err) {
    return throwError('Cannot get country', err);
  }
};

const getCountries = async (
  req: Req<query<{ countryIds: Ids }>>,
  res: Res<ReadonlyArray<Country>>
) => {
  const { query } = req;

  try {
    const countries = await Country.findAll(
      pagination(
        {
          where: clean({ id: query.countryIds }),
        },
        { page: query.page, pageSize: query.page }
      )
    );

    return res.status(200).send(countries);
  } catch (err) {
    return throwError('Cannot create country', err);
  }
};

const postCountry = async (req: Req<body<Country>>, res: Res<Country>) => {
  const { body } = req;

  try {
    const country = await Country.create(pick(body, 'name'));

    return res.status(201).send(country);
  } catch (err) {
    return throwError('Cannot create country', err);
  }
};

const putCountry = async (
  req: Req<param, body<Partial<Country>>>,
  res: Res<Country>
) => {
  const { params, body } = req;

  try {
    const country = await findOrFail(
      Country.findOne({
        where: { id: params.id },
      })
    );

    await country.update(pick(body, 'name'));

    return res.status(200).send(country);
  } catch (err) {
    return throwError('Cannot update country', err);
  }
};

const deleteCountry = async (req: Req<param>, res: Res<string>) => {
  const { params } = req;

  try {
    const country = await findOrFail(
      Country.findOne({
        where: { id: params.id },
      })
    );

    await country.destroy();

    return res.status(200).send('Country has been deleted');
  } catch (err) {
    return throwError('Cannot delete country', err);
  }
};

const country = {
  getCountry,
  getCountries,
  postCountry,
  putCountry,
  deleteCountry,
};

export default country;
