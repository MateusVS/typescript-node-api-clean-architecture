import { HttpException } from '../../@types/http-exception'

class UnauthorizedError extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(401, message)
  }
}

export { UnauthorizedError }
