import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../../@types/http-exception'

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof HttpException) {
    return response.status(error.status).json({
      status: error.status,
      message: error.message,
    })
  }

  return response.status(500).json({
    status: 500,
    message: 'Internal server error',
  })
}
