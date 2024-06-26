import { Tenant } from '../../../domain/entities/tenant.entity';
import { TenantDTO } from '../../dto/tenants/tenant.dto';
import { TenantsRepository } from '../../repositories/tenants.repository';

class CreateTenantsUseCase {
  constructor(private repository: TenantsRepository) { }

  async execute(dto: TenantDTO): Promise<Tenant> {
    return this.repository.create(dto)
  }
}

export { CreateTenantsUseCase }
