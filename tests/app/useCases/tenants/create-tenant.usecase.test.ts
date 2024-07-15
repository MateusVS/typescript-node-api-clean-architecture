import { CreateTenantsUseCase } from '@app/useCases/tenants'
import { mockCreateTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Create Tenants Use Case', () => {
  let repository: FakeTenantsRepository
  let sut: CreateTenantsUseCase

  beforeEach(() => {
    repository = new FakeTenantsRepository()
    sut = new CreateTenantsUseCase(repository)
  })

  it('Should, create a new Tenant', async() => {
    const data = mockCreateTenant()

    const createdTenant = await sut.execute(data)

    expect(createdTenant).toBeDefined()
    expect(createdTenant.id).toBeDefined()
    expect(createdTenant.name).toBe(data.name)
    expect(createdTenant.cnpj).toBe(data.cnpj)
    expect(createdTenant.actived).toBe(data.actived)

    const storedTenant = await repository.findOne(createdTenant.id)
    expect(storedTenant).toEqual(createdTenant)
  })
})
