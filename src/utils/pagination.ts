import { FindOptions, Model, ModelStatic } from 'sequelize';

const pagination = <T extends Model>(
  model: ModelStatic<T>,
  query: FindOptions,
  page = 0,
  pageSize = 5
) => {
  const offset = Number(page) * Number(pageSize);
  const limit = Number(pageSize);

  return model.findAll({ ...query, offset, limit });
};

export default pagination;
