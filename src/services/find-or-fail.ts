import { badData } from '@hapi/boom';
import { FindOptions, Model, ModelStatic } from 'sequelize';

const findOrFail = async <T extends Model>(
  model: ModelStatic<T>,
  query: FindOptions
) => {
  try {
    const data = await model.findOne(query);
    if (!data) throw badData('No data found, faulty id passed');
    return data;
  } catch (err) {
    throw badData((err as Error).message);
  }
};

export default findOrFail;
