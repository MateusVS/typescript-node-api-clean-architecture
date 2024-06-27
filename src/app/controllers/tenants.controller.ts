import { HttpRequest, HttpResponse } from '../../main/adapters/http.adapter'
import * as httpStatus from '../../infra/helpers/http-response'
import { TenantDTO } from '../dto/tenants/tenant.dto'
import {
  CheckCnpjExistsUseCase,
  CreateTenantsUseCase,
  DisableTenantUseCase,
  ListAllTenantsUsecase,
  ShowTenantUsecase,
  UpdateTenantsUseCase,
} from '../useCases/tenants'

class TenantsController {
  constructor(
    private createTenantUseCase: CreateTenantsUseCase,
    private updateTenantUseCase: UpdateTenantsUseCase,
    private listAllTenantsUseCase: ListAllTenantsUsecase,
    private showTenantUseCase: ShowTenantUsecase,
    private disableTenantUseCase: DisableTenantUseCase,
    private checkCnpjExistsUseCase: CheckCnpjExistsUseCase,
  ) { }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const tenant: TenantDTO = httpRequest.body

    try {
      this.checkIfCnpjAlreadyExists(tenant.cnpj)

      const response = await this.createTenantUseCase.execute(tenant)

      return httpStatus.created('Tenant Created', response)
    } catch (error: any) {
      return error.message === 'CNPJ Already exists'
        ? httpStatus.conflict(error.message)
        : httpStatus.badRequest(error.message)
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const tenant: TenantDTO = httpRequest.body
    const id: string = httpRequest.params.id

    try {
      this.checkIfCnpjAlreadyExists(tenant.cnpj)

      const response = await this.updateTenantUseCase.execute(id, tenant)

      return httpStatus.ok('Tenant Updated', response)
    } catch (error: any) {
      return error.message === 'CNPJ Already exists'
        ? httpStatus.conflict(error.message)
        : httpStatus.badRequest(error.message)
    }
  }

  async show(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id

    try {
      const response = await this.showTenantUseCase.execute(id)

      return httpStatus.ok('Tenant Found', response)
    } catch (error: any) {
      return httpStatus.badRequest(error.message)
    }
  }

  async list(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.listAllTenantsUseCase.execute()

      return httpStatus.ok('Tenants Found', response)
    } catch (error: any) {
      return httpStatus.badRequest(error.message)
    }
  }

  async disable(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id

    try {
      await this.disableTenantUseCase.execute(id)

      return httpStatus.noContent('Tenant Disabled')
    } catch (error: any) {
      return httpStatus.badRequest(error.message)
    }
  }

  private async checkIfCnpjAlreadyExists(cnpj: string): Promise<HttpResponse | void> {
    const cnpjAlreadyExists = await this.checkCnpjExistsUseCase.execute(cnpj)

    if (cnpjAlreadyExists) {
      throw new Error('CNPJ Already exists')
    }
  }
}

export { TenantsController }
