import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from './http.adapter'
import { errorMiddleware } from '@main/middlewares/error.middleware'
import { z } from 'zod'
import { validateBodyMiddleware } from '@main/middlewares/validate-body.middleware'
import { MulterAdapter } from '@infra/upload/multer.adapter'
import { JWTService } from '@infra/cryptography'
import { AuthType } from 'src/@types/auth.types'
import { authMiddleware } from '@main/middlewares/auth.middleware'

const uploadAdapter = new MulterAdapter()
const decrypterAdaper = new JWTService()

export const routerAdapter = (
  controller: any,
  method: string,
  schema?: z.ZodObject<any, any>,
  uploadOptions?: { single?: boolean, fieldName?: string, multiple?: boolean, maxCount?: number },
  authType: AuthType = AuthType.USER,
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await authMiddleware(decrypterAdaper, authType)(request, response, next)

      if (uploadOptions) {
        const { single, fieldName, multiple, maxCount } = uploadOptions

        if (single && fieldName) {
          await new Promise<void>((resolve, reject) => {
            uploadAdapter.singleFile(fieldName)(request, response, (error) => {
              if (error) {
                reject(error)
              }
              resolve()
            })
          })
        } else if (multiple && fieldName) {
          await new Promise<void>((resolve, reject) => {
            uploadAdapter.multFiles(fieldName, maxCount)(request, response, (error) => {
              if (error) {
                reject(error)
              }
              resolve()
            })
          })
        }
      }

      const httpRequest: HttpRequest = {
        body: request?.body,
        headers: request?.headers,
        params: request?.params,
        query: request?.query,
        file: request?.file,
        files: request?.files,
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
    } catch (error) {
      next(error)
    }
  }
}
