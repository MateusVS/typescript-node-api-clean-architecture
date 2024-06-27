import { Tenant } from '../../../domain/entities/tenant.entity'
import { TenantsRepository } from '../../repositories/tenants.repository'

class ShowTenantUsecase {
  constructor(private repository: TenantsRepository) { }

  async execute(id: string): Promise<Tenant | null> {
    return this.repository.findOne(id)
  }
}

export { ShowTenantUsecase }