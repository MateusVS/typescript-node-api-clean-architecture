import { Tenant } from '@domain/entities/tenant.entity'
import { TenantsRepository } from '@app/repositories/tenants.repository'

class ListAllTenantsUsecase {
  constructor(private repository: TenantsRepository) { }

  async execute(): Promise<Tenant[] | null> {
    return await this.repository.findAll()
  }
}

export { ListAllTenantsUsecase }
