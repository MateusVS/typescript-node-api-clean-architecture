import { HttpResponse } from '@main/adapters/http.adapter'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ZodError } from 'zod'

export const ok = (message: string, data?: any): HttpResponse => ({
  status: 200,
  message,
  data,
})

export const created = (message: string, data?: any): HttpResponse => ({
  status: 201,
  message,
  data,
})

export const noContent = (message: string): HttpResponse => ({
  status: 204,
  message,
})

export const badRequest = (error: any): HttpResponse => {
  let { message } = error

  if (error instanceof ZodError) {
    message = error.errors.map(err => `${err.path}: ${err.message}`).join(' \n ')
  } else if (error instanceof PrismaClientKnownRequestError) {
    message = `Prisma error: ${error.message}`
  }

  return {
    status: 400,
    message,
  }
}

export const notFound = (message: string): HttpResponse => ({
  status: 404,
  message,
})

export const serverError = (message: string): HttpResponse => ({
  status: 500,
  message,
})

export const conflict = (message: string): HttpResponse => ({
  status: 409,
  message,
})
