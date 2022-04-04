/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Express, Request, Response } from 'express';

interface Auth {
  uid: string;
  email?: string;
  picture?: string;
}

interface Pagination {
  page: number;
  pageSize: number;
}

interface ParamId {
  id: string;
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

  interface auth {
    auth: Auth;
  }

  interface body<Body> {
    body: Body;
  }

  interface param<Param = unknown> {
    params: Param & ParamId;
  }

  interface query<Query = unknown> {
    query: Partial<Query> & Pagination;
  }

  interface Res<Send> {
    status(status: number): {
      send(send: Send);
    };
  }

  type Id = string;

  type Ids = string[] | string;

  type Empty = param<never> | query<never> | body<never> | auth;

  type Req<T = Empty, G = Empty, H = Empty, J = Empty> = T & G & H & J;
}
