import { FindOptions } from 'sequelize';

const pagination = (
  query: FindOptions,
  {
    page = 0,
    pageSize = 25,
  }: {
    page: number;
    pageSize: number;
  }
) => {
  const offset = Number(page) * Number(pageSize);
  const limit = Number(pageSize);

  return {
    ...query,
    offset,
    limit,
  };
};

export default pagination;
