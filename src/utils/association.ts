import { FindOptions } from 'sequelize';

const association = (query: FindOptions, page = 0, pageSize = 25) => {
  const offset = Number(page) * Number(pageSize);
  const limit = Number(pageSize);

  return {
    ...query,
    offset,
    limit,
  };
};

export default association;
