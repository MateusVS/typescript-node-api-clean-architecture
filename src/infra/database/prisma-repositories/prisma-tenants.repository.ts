import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsRepository } from '@app/repositories/tenants.repository'
import { Tenant } from '@domain/entities/tenant.entity'
import { prisma } from '../prisma'

class PrismaTenantsRepository extends TenantsRepository {
  async create(data: TenantDTO): Promise<Tenant> {
    return await prisma.tenants.create({ data })
  }

  async findAll(): Promise<Tenant[] | null> {
    return await prisma.tenants.findMany()
  }

  async findOne(id: string): Promise<Tenant | null> {
    return await prisma.tenants.findFirst({
      where: {
        id,
      },
    })
  }

  async findByCnpj(cnpj: string): Promise<Tenant | null> {
    return await prisma.tenants.findFirst({
      where: {
        cnpj,
      },
    })
  }

  async update(id: string, data: TenantDTO): Promise<Tenant> {
    return await prisma.tenants.update({
      where: {
        id
      },
      data
    })
  }

  async disable(id: string): Promise<void> {
    await prisma.tenants.update({
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
