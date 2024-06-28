import { errorMiddleware } from '@infra/middlewares/error.middleware';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from 'src/types/HttpException';
import { expect, vi, it, beforeAll, Mock } from 'vitest';

let mockRequest: Partial<Request>
let mockResponse: Partial<Response>
let mockNext: Mock

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
