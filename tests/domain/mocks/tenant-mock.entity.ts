import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { Tenant } from '@domain/entities/tenant.entity'
import { faker } from '@faker-js/faker'

export const mockTenant = (): Tenant => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  cnpj: faker.string.numeric({ length: 14 }),
  actived: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
})

export const mockCreateTenant = (): TenantDTO => ({
  name: faker.company.name(),
  cnpj: faker.string.numeric({ length: 14 }),
  actived: faker.datatype.boolean(),
})

export const mockInvalidCNPJLengthCreateTenant = (): TenantDTO => ({
  name: faker.company.name(),
  cnpj: faker.string.numeric({ length: 15 }),
  actived: faker.datatype.boolean(),
})

export const mockInvalidNonNumericCNPJCreateTenant = (): TenantDTO => ({
  name: faker.company.name(),
  cnpj: faker.string.numeric({ length: 15 }),
  actived: faker.datatype.boolean(),
})
