import { errorMiddleware } from '@main/middlewares/error.middleware'
import { NextFunction, Request, Response } from 'express'
import { HttpException } from 'src/@types/http-exception'
import { describe, expect, vi, it, beforeAll, Mock } from 'vitest'

let mockRequest: Partial<Request>
let mockResponse: Partial<Response>
let mockNext: Mock

describe('Error Middleware', () => {
  beforeAll(() => {
    mockRequest = {} as Request
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as Partial<Response>
    mockNext = vi.fn()
  })

  it('Should respond with the status and message of the HttpException', () => {
    const error: HttpException = {
      status: 404,
      message: 'Not Found',
      name: 'The route is not found',
    }

    errorMiddleware(error, mockRequest as Request, mockResponse as Response, mockNext as NextFunction)

    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 404,
      message: 'Not Found',
    })
  })
})
