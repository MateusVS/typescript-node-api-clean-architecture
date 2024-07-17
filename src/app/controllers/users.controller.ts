import { HttpRequest, HttpResponse } from '@main/adapters/http.adapter'
import * as httpStatus from '@infra/helpers/http-response'
import { CreateUserDTO, UpdateUserDTO } from '@app/dto/users/user.dto'
import { File } from '@domain/protocols/file'
import {
  CreateUserUseCase,
  DisableUserUseCase,
  ListUsersByTenantUseCase,
  ShowUserUsecase,
  UpdateUserUseCase,
 } from '@app/useCases/users'

class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private showUserUseCase: ShowUserUsecase,
    private listUsersByTenantUseCase: ListUsersByTenantUseCase,
    private disableUserUseCase: DisableUserUseCase,
  ) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user: CreateUserDTO = httpRequest.body
      const file: File = httpRequest.file

      const response = await this.createUserUseCase.execute(user, file)

      return httpStatus.created('User Created', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const user: UpdateUserDTO = httpRequest.body
      const file: File = httpRequest.file

      const response = await this.updateUserUseCase.execute(id, user, file)

      return httpStatus.ok('User Updated', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async show(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const response = await this.showUserUseCase.execute(id)

      if (response == null) {
        return httpStatus.noContent('User Not Found')
      }

      return httpStatus.ok('User Found', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async list(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { tenantId } = httpRequest.query

      const response = await this.listUsersByTenantUseCase.execute(tenantId)

      return httpStatus.ok('Users Found', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async disable(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      await this.disableUserUseCase.execute(id)

      return httpStatus.noContent('User Disabled')
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }
}

export { UsersController }
