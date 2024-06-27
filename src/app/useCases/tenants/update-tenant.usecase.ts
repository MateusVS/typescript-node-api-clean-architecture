import { Tenant } from '../../../domain/entities/tenant.entity';
import { TenantDTO } from '../../dto/tenants/tenant.dto';
import { TenantsRepository } from '../../repositories/tenants.repository';

class UpdateTenantsUseCase {
  constructor(private repository: TenantsRepository) { }

  async execute(id: string, dto: TenantDTO): Promise<Tenant> {
    return await this.repository.update(id, dto)
  }
}

export { UpdateTenantsUseCase }
