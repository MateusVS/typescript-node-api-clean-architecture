import { HttpResponse } from '../../main/adapters/http.adapter'

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

export const badRequest = (message: string): HttpResponse => ({
  status: 400,
  message,
})

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
