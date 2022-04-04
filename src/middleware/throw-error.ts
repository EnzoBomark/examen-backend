import * as Seq from 'sequelize';
import * as sentry from '@sentry/node';
import { badData, badRequest, Boom } from '@hapi/boom';

export const throwError = (message: string, err: unknown) => {
  if (process.env.NODE_ENV === 'production') sentry.captureException(err);

  if ((err as Seq.ValidationError).name === 'SequelizeValidationError') {
    const errObj: { [key: string]: string } = {};

    (err as Seq.ValidationError).errors.forEach((er) => {
      if (er.path) {
        errObj[er.path] = er.message
          .replace(/\./g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase()
          .trim();
      }
    });

    const error = badRequest(message);

    error.output.payload = {
      ...error.output.payload,
      attributes: errObj,
    };

    throw error;
  }

  if ((err as Boom).output?.statusCode === 409) throw err;
  if ((err as Boom).output?.statusCode === 422) throw err;

  throw badData('Something went wrong, try again later');
};

export default throwError;
