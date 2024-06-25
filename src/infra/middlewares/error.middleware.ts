import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../types/HttpException';

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return response.status(error.status).json({
    status: error.status,
    message: error.message || 'Internal server error'
  })
}
