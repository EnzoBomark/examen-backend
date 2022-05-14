import { NextFunction, Request, Response } from 'express';

import { unauthorized } from '@hapi/boom';
import firebase from '../firebase';
import { prod, test } from '../config/constant.config';

const decodeToken = async (req: Request, _: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    throw unauthorized('No token provided');
  }

  if (!accessToken.includes('Bearer')) {
    throw unauthorized('Invalid token format provided');
  }

  try {
    if (test) {
      req.auth = accessToken.includes('new') ? { uid: '5' } : { uid: '1' };
    }

    if (prod) {
      req.auth = await firebase.root
        .auth()
        .verifyIdToken(accessToken?.replace(/^Bearer\s/, ''));
    }

    return next();
  } catch (err) {
    throw unauthorized((err as Error).message);
  }
};

export default decodeToken;
