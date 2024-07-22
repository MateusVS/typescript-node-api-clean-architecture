import { HttpRequest, HttpResponse } from '@main/adapters/http.adapter'
import * as httpStatus from '@infra/helpers/http-response'
import { CreateSessionUseCase } from '@app/useCases/session/create-session.usecase'
import { CreateSessionDTO } from '@app/dto/session/create-session.dto'

class SessionController {
  constructor(
    private createSessionUseCase: CreateSessionUseCase
  ) {}

  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      const credentials: CreateSessionDTO = httpRequest.body

      const response = await this.createSessionUseCase.execute(credentials)

      return httpStatus.created('Authenticated', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }
}

export { SessionController }
