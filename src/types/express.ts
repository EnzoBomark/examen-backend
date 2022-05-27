export interface Auth {
  auth: {
    uid: string;
    email?: string;
    picture?: string;
  };
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface ParamId {
  id: string;
}

export interface Body<B> {
  body: B;
}

export interface Param<P = unknown> {
  params: P & ParamId;
}

export interface Query<Q = unknown> {
  query: Partial<Q> & Pagination;
}

export interface Res<Send> {
  status(status: number): {
    send(send: Send): unknown;
  };
}

export type Id = string;

export type Ids = string[] | string;

export type Empty = Param<never> | Query<never> | Body<never> | Auth;

export type Req<T = Empty, G = Empty, H = Empty, J = Empty> = T & G & H & J;
