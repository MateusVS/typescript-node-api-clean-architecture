import { HttpException } from '../../types/HttpException'

class UnsupportedMediaType extends HttpException {
  constructor(message: string = 'Unsupported Media Type') {
    super(415, message)
  }
}

export { UnsupportedMediaType }
