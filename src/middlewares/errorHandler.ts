import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(err);
    }
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }