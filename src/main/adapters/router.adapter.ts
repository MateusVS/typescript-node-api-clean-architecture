import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from './http.adapter'
import { errorMiddleware } from '@infra/middlewares/error.middleware'
import { z } from 'zod'
import { validateBodyMiddleware } from '@infra/middlewares/validate-body.middleware'

export const routerAdapter = (
  controller: any,
  method: string,
  schema?: z.ZodObject<any, any>
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: request?.body,
      headers: request?.headers,
      params: request?.params,
      query: request?.query,
    }

    if (schema) {
      await validateBodyMiddleware(schema)(request, response, next)
    }

    const httpResponse = await controller[method](httpRequest)

    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      return response.status(httpResponse.status).json(httpResponse)
    } else {
      return errorMiddleware(httpResponse, request, response, next)
    }
  }
}
