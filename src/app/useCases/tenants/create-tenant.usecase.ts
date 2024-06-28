import { Tenant } from '@domain/entities/tenant.entity'
import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsRepository } from '@app/repositories/tenants.repository'

class CreateTenantsUseCase {
  constructor(private repository: TenantsRepository) { }

  async execute(dto: TenantDTO): Promise<Tenant> {
    return await this.repository.create(dto)
  }
}

export { CreateTenantsUseCase }
