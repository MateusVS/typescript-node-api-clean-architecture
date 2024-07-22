import { HttpException } from '../../@types/http-exception'

class UnsupportedMediaType extends HttpException {
  constructor(message: string = 'Unsupported Media Type') {
    super(415, message)
  }
}

export { UnsupportedMediaType }
