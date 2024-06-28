import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsRepository } from '@app/repositories/tenants.repository'
import { Tenant } from '@domain/entities/tenant.entity'
import { faker } from '@faker-js/faker'

class FakeTenantsRepository extends TenantsRepository {
  public data: Tenant[] = []

  async create(dto: TenantDTO) {
    const { name, actived, cnpj } = dto

    const currentDate = new Date()

    const tenant: Tenant = new Tenant({
      id: faker.string.uuid(),
      name,
      actived,
      cnpj,
      createdAt: currentDate,
      updatedAt: currentDate,
    })

    this.data.push(tenant)

    return tenant
  }

  async findAll(): Promise<Tenant[] | null> {
    return this.data
  }

  async findOne(id: string): Promise<Tenant | null> {
    const foundTenant = this.data.find(tenant => tenant.id === id)
    return foundTenant || null
  }

  async update(id: string, dto: TenantDTO): Promise<Tenant> {
    const tenantIndex = this.data.findIndex(tenant => tenant.id === id)

    if (tenantIndex === -1) {
      throw new Error('Tenant not found')
    }

    const updatedTenant = { ...this.data[tenantIndex], ...dto }
    updatedTenant.updatedAt = new Date()

    this.data[tenantIndex] = updatedTenant

    return updatedTenant
  }

  async disable(id: string): Promise<void> {
    const tenantIndex = this.data.findIndex(tenant => tenant.id === id)

    if (tenantIndex === -1) {
      throw new Error('Tenant not found')
    }

    this.data[tenantIndex].actived = false
    this.data[tenantIndex].updatedAt = new Date()
  }

  async findByCnpj(cnpj: string): Promise<Tenant | null> {
    const foundTenant = this.data.find(tenant => tenant.cnpj === cnpj)
    return foundTenant || null
  }
}

 export { FakeTenantsRepository }
