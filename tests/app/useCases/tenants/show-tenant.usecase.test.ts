import { ShowTenantUsecase } from '@app/useCases/tenants'
import { Tenant } from '@domain/entities/tenant.entity'
import { mockTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Show Tenant Use Case', () => {
  let repository: FakeTenantsRepository
  let sut: ShowTenantUsecase
  let storedTenant: Tenant

  beforeEach(async () => {
    repository = new FakeTenantsRepository()
    sut = new ShowTenantUsecase(repository)

    storedTenant = await repository.create(mockTenant())
  })

  it('Should return a tenant when tenant is found', async () => {
    const tenant = await sut.execute(storedTenant.id)

    expect(tenant).toEqual(storedTenant)
  })

  it('Should return null when tenant is not found', async() => {
    const tenant = await sut.execute('non-existent-id')

    expect(tenant).toBeNull()
  })
})
