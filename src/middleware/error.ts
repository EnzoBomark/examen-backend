import type { NextFunction, Request, Response } from 'express';
import { boomify } from '@hapi/boom';

import { kill } from '../utils';

const globalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const boom = boomify(err);

  res
    .status(boom.output.payload.statusCode)
    .json({ error: boom.output.payload });

  if (boom.output.payload.statusCode >= 500) kill(err);

  next();
};

export default globalError;
