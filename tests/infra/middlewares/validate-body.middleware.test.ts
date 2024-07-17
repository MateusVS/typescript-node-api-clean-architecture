import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { Request, Response } from 'express'
import { BadRequestError } from '@main/errors/bad-request.error'
import { z } from 'zod'
import { validateBodyMiddleware } from '@main/middlewares/validate-body.middleware'

describe('validateBodyMiddleware', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: Mock

  const schema = z.object({
    name: z.string(),
    age: z.number().min(0),
  })

  beforeEach(() => {
    req = {
      body: {},
    }
    res = {}
    next = vi.fn()
  })

  it('should call next() with validated body when data is valid', async () => {
    req.body = {
      name: 'John Doe',
      age: 30,
    }

    const middleware = validateBodyMiddleware(schema)

    await middleware(req as Request, res as Response, next)

    expect(req.body).toEqual({
      name: 'John Doe',
      age: 30,
    })
    expect(next).toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })

  it('should call next() with BadRequestError when data is invalid', async () => {
    req.body = {
      name: 'John Doe',
      age: -5,
    }

    const middleware = validateBodyMiddleware(schema)

    await middleware(req as Request, res as Response, next)

    expect(next).toHaveBeenCalledWith(expect.any(BadRequestError))

    const errorArg = next.mock.calls[0][0] as BadRequestError
    expect(errorArg).toBeInstanceOf(BadRequestError)
    expect(errorArg.message).toContain('Number must be greater than or equal to 0')
  })
})
