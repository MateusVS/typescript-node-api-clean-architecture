import { Tenant } from '../../../domain/entities/tenant.entity'
import { TenantsRepository } from '../../repositories/tenants.repository'

class ListAllTenantsUsecase {
  constructor(private repository: TenantsRepository) { }

  async execute(): Promise<Tenant[] | null> {
    return this.repository.findAll()
  }
}

export { ListAllTenantsUsecase }
