import { HttpRequest, HttpResponse } from '@main/adapters/http.adapter'
import * as httpStatus from '@infra/helpers/http-response'
import { TenantDTO, tenantSchema } from '@app/dto/tenants/tenant.dto'
import {
  CheckCnpjExistsUseCase,
  CreateTenantsUseCase,
  DisableTenantUseCase,
  ListAllTenantsUsecase,
  ShowTenantUsecase,
  UpdateTenantsUseCase,
} from '@app/useCases/tenants'

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
    const { body } = httpRequest

    try {
      const tenant: TenantDTO = tenantSchema.parse(body)

      if (await this.checkCnpjExistsUseCase.execute(tenant.cnpj)) {
        return httpStatus.conflict('CNPJ already exists')
      }

      const response = await this.createTenantUseCase.execute(tenant)

      return httpStatus.created('Tenant Created', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id
    const { body } = httpRequest

    try {
      const tenant: TenantDTO = tenantSchema.parse(body)

      if (await this.checkCnpjExistsUseCase.execute(tenant.cnpj)) {
        return httpStatus.conflict('CNPJ already exists')
      }

      const response = await this.updateTenantUseCase.execute(id, tenant)

      return httpStatus.ok('Tenant Updated', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async show(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id

    try {
      const response = await this.showTenantUseCase.execute(id)

      if (response == null) {
        return httpStatus.noContent('Tenant Not Found')
      }

      return httpStatus.ok('Tenant Found', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async list(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.listAllTenantsUseCase.execute()

      return httpStatus.ok('Tenants Found', response)
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }

  async disable(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id

    try {
      await this.disableTenantUseCase.execute(id)

      return httpStatus.noContent('Tenant Disabled')
    } catch (error: any) {
      return httpStatus.badRequest(error)
    }
  }
}

export { TenantsController }
