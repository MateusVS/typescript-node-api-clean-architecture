import { Tenant } from '@domain/entities/tenant.entity'
import { TenantsRepository } from '@app/repositories/tenants.repository'

class ShowTenantUsecase {
  constructor(private repository: TenantsRepository) { }

  async execute(id: string): Promise<Tenant | null> {
    return await this.repository.findOne(id)
  }
}

export { ShowTenantUsecase }
