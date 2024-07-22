import { HttpException } from '../../@types/http-exception'

class ConflictError extends HttpException {
  constructor(message: string = 'Conflict') {
    super(409, message)
  }
}

export { ConflictError }
