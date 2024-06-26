import { TenantsRepository } from '../../repositories/tenants.repository'

class DisableTenantUseCase {
  constructor(private repository: TenantsRepository) { }

  async execute(id: string): Promise<void> {
    return this.repository.disable(id)
  }
}

export { DisableTenantUseCase }
