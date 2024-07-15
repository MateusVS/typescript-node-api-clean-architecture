import { ListAllTenantsUsecase } from '@app/useCases/tenants'
import { Tenant } from '@domain/entities/tenant.entity'
import { mockTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('List All Tenants Use Case', () => {
  let repository: FakeTenantsRepository
  let sut: ListAllTenantsUsecase
  let tenants: Tenant[]

  beforeEach(async () => {
    repository = new FakeTenantsRepository()
    sut = new ListAllTenantsUsecase(repository)

    tenants = [
      await repository.create(mockTenant()),
      await repository.create(mockTenant()),
      await repository.create(mockTenant()),
    ]
  })

  it('Should list all Tenants', async () => {
    const listedTenants = await sut.execute()

    expect(listedTenants).toBeDefined()
    expect(listedTenants).toHaveLength(tenants.length)

    listedTenants?.forEach((tenant: Tenant, index: number) => {
      expect(tenant.id).toBe(tenants[index].id)
      expect(tenant.name).toBe(tenants[index].name)
    })
  })
})
