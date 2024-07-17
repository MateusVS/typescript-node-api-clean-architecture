import { Tenant } from '@domain/entities/tenant.entity'
import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsRepository } from '@app/repositories/tenants.repository'
import { TenantsService } from '@app/services/tenants.service'

class UpdateTenantsUseCase {
  constructor(
    private repository: TenantsRepository,
    private service: TenantsService,
  ) {}

  async execute(id: string, data: TenantDTO): Promise<Tenant> {
    const { cnpj } = data

    await this.checkCnpjExists(cnpj)

    return await this.repository.update(id, data)
  }

  private async checkCnpjExists(cnpj: string): Promise<void> {
    await this.service.checkIfCnpjAlreadyExists(cnpj)
  }
}

export { UpdateTenantsUseCase }
