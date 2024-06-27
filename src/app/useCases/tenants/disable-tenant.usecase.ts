import { TenantsRepository } from '../../repositories/tenants.repository'

class DisableTenantUseCase {
  constructor(private repository: TenantsRepository) { }

  async execute(id: string): Promise<void> {
    return await this.repository.disable(id)
  }
}

export { DisableTenantUseCase }
