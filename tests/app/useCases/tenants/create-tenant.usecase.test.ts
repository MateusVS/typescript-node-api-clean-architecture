import { TenantsService } from '@app/services/tenants.service'
import { CreateTenantsUseCase } from '@app/useCases/tenants'
import { ConflictError } from '@main/errors/conflict.error'
import { mockCreateTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Create Tenants Use Case', () => {
  let repository: FakeTenantsRepository
  let service: TenantsService
  let sut: CreateTenantsUseCase

  beforeEach(() => {
    repository = new FakeTenantsRepository()
    service = new TenantsService(repository)
    sut = new CreateTenantsUseCase(repository, service)
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

  it('Should throw an error if the CNPJ already exists', async () => {
    const data = mockCreateTenant()
    await sut.execute(data)

    await expect(sut.execute(data)).rejects.toThrow(ConflictError)
  })
})
