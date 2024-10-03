import { Request } from 'express';

export type AuthRequest = Request & {
  headers: {
    authorization: string;
  };
};
