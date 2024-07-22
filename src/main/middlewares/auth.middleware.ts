import { Decrypter } from '@domain/protocols'
import { UnauthorizedError } from '@main/errors/unauthorized.error'
import { NextFunction, Request, Response } from 'express'
import { AuthType } from 'src/@types/auth.types'

export function authMiddleware(jwtService: Decrypter, authType: AuthType) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (authType === AuthType.PUBLIC) {
      return next()
    }

    const { authorization } = request.headers

    if (!authorization) {
      throw new UnauthorizedError('To carry out this action, you must be authenticated')
    }

    const token = authorization.replace('Bearer', '').trim()

    // TODO: Implements authType to admin users

    try {
      const data = await jwtService.decrypt(token)

      const id = JSON.parse(data)

      request.userId = id

      return next()
    } catch(error) {
      throw new UnauthorizedError('Error authenticating token')
    }
  }
}





