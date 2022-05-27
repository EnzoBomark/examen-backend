/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Express, Request, Response } from 'express';

interface Auth {
  uid: string;
  email?: string;
  picture?: string;
}

declare global {
  namespace Express {
    interface Request {
      auth: Auth;
    }
    interface Response {
      auth: Auth;
    }
  }
}
