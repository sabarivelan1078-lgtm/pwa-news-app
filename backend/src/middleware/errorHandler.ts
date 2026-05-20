import express, { Request, Response, NextlewareFunction } from 'express';
import logger from '../utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: express.NextFunction) => {
  logger.error('Unhandled error', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message
    }
  });
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
