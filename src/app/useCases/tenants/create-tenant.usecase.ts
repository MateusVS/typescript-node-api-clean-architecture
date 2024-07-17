import { Tenant } from '@domain/entities/tenant.entity'
import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsRepository } from '@app/repositories/tenants.repository'
import { TenantsService } from '@app/services/tenants.service'

class CreateTenantsUseCase {
  constructor(
    private repository: TenantsRepository,
    private service: TenantsService,
  ) {}

  async execute(data: TenantDTO): Promise<Tenant> {
    const { cnpj } = data

    await this.checkCnpjExists(cnpj)

    return await this.repository.create(data)
  }

  private async checkCnpjExists(cnpj: string): Promise<void> {
    await this.service.checkIfCnpjAlreadyExists(cnpj)
  }
}

export { CreateTenantsUseCase }
