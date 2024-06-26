import { HttpRequest, HttpResponse } from '../../infra/adapters/http.adapter'
import { TenantDTO } from '../dto/tenants/tenant.dto';
import {
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
  ) { }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const tenant: TenantDTO = httpRequest.body

    try {
      const response = await this.createTenantUseCase.execute(tenant)

      return {
        status: 201,
        message: 'Tenant Created',
        data: response,
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      }
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const tenant: TenantDTO = httpRequest.body
    const id: string = httpRequest.params.id

    try {
      const response = await this.updateTenantUseCase.execute(id, tenant)

      return {
        status: 200,
        message: 'Tenant Updated',
        data: response,
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      }
    }
  }

  async show(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id

    try {
      const response = await this.showTenantUseCase.execute(id)

      return {
        status: 200,
        message: 'Tenant Found',
        data: response,
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      }
    }
  }

  async list(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.listAllTenantsUseCase.execute()

      return {
        status: 200,
        message: 'Tenants Found',
        data: response
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      }
    }
  }

  async disable(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id

    try {
      const response = await this.disableTenantUseCase.execute(id)

      return {
        status: 204,
        message: 'Tenant disabled'
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      }
    }
  }
}

export { TenantsController }
