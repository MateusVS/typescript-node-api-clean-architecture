import { Tenant } from '../../domain/entities/tenant.entity';
import { TenantDTO } from '../dto/tenants/tenant.dto';

abstract class TenantsRepository {
  abstract create(dto: TenantDTO): Promise<Tenant>
  abstract findAll(): Promise<Tenant[] | null>
  abstract findOne(id: string): Promise<Tenant | null>
  abstract update(id: string, dto: TenantDTO): Promise<Tenant>
  abstract disable(id: string): Promise<void>
  abstract findByCnpj(cnpj: string): Promise<Tenant | null>
}

export { TenantsRepository }
