export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
  query?: any
  file?: any
  files?: any
}

export interface HttpResponse {
  status: number
  message: string
  data?: any
}
