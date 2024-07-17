import { BadRequestError } from '@main/errors/bad-request.error'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const validateBodyMiddleware = (schema: z.ZodObject<any, any>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request
      const validatedBody = schema.parse(body)

      request.body = validatedBody

      next()
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        next(new BadRequestError(error.message))
      } else {
        next(error)
      }
    }
  }
}

export { validateBodyMiddleware }
