import { HttpException } from '../../@types/http-exception'

class BadRequestError extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(400, message)
  }
}

export { BadRequestError }
