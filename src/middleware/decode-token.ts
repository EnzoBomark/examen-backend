import { NextFunction, Request, Response } from 'express';

import { unauthorized } from '@hapi/boom';
import firebase from '../firebase';

const decodeToken = async (req: Request, _: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    throw unauthorized('No token provided');
  }

  if (!accessToken.includes('Bearer')) {
    throw unauthorized('Invalid token format provided');
  }

  try {
    if (process.env.NODE_ENV === 'test') {
      req.auth = accessToken.includes('new') ? { uid: '5' } : { uid: '1' };
    }

    if (process.env.NODE_ENV !== 'test') {
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
