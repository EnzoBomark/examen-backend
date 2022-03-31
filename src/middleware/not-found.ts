import { notFound } from '@hapi/boom';

import type { Request, Response, NextFunction } from 'express';

const resourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  next(notFound('The requested resource does not exist.'));
};

export default resourceNotFound;
