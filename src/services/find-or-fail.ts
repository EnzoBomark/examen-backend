import { badData } from '@hapi/boom';

const findOrFail = async <T>(model: Promise<T | null>) => {
  const data = await model;
  if (!data) throw badData('No data found, faulty id passed');
  return data;
};

export default findOrFail;
