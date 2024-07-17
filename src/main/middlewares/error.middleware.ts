import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../../types/HttpException'

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  let errorMessage = error.message || 'Internal server error'

  return response.status(error.status).json({
    status: error.status,
    message: errorMessage,
  })
}
