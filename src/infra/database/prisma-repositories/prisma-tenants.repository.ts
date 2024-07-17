import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsRepository } from '@app/repositories/tenants.repository'
import { Tenant } from '@domain/entities/tenant.entity'
import { prisma } from '../prisma'

class PrismaTenantsRepository extends TenantsRepository {
  async create(data: TenantDTO): Promise<Tenant> {
    return await prisma.tenant.create({ data })
  }

  async findAll(): Promise<Tenant[] | null> {
    return await prisma.tenant.findMany()
  }

  async findOne(id: string): Promise<Tenant | null> {
    return await prisma.tenant.findUnique({
      where: {
        id,
      },
    })
  }

  async findByCnpj(cnpj: string): Promise<Tenant | null> {
    return await prisma.tenant.findUnique({
      where: {
        cnpj,
      },
    })
  }

  async update(id: string, data: TenantDTO): Promise<Tenant> {
    return await prisma.tenant.update({
      where: {
        id
      },
      data
    })
  }

  async disable(id: string): Promise<void> {
    await prisma.tenant.update({
      where: {
        id
      },
      data: {
        actived: false,
      },
    })
  }
}

export { PrismaTenantsRepository }
