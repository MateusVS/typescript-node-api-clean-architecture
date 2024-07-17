import { HttpException } from '../../types/HttpException'

class ConflictError extends HttpException {
  constructor(message: string = 'Conflict') {
    super(409, message)
  }
}

export { ConflictError }
