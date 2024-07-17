import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsService } from '@app/services/tenants.service'
import { UpdateTenantsUseCase } from '@app/useCases/tenants'
import { Tenant } from '@domain/entities/tenant.entity'
import { ConflictError } from '@main/errors/conflict.error'
import { mockCreateTenant, mockTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Update Tenant Use Case', () => {
  let repository: FakeTenantsRepository
  let service: TenantsService
  let sut: UpdateTenantsUseCase
  let storedTenant: Tenant

  beforeEach(async () => {
    repository = new FakeTenantsRepository()
    service = new TenantsService(repository)
    sut = new UpdateTenantsUseCase(repository, service)

    storedTenant = await repository.create(mockTenant())
  })

  it('Should update a tenant successfully', async () => {
    const data: TenantDTO = mockCreateTenant()
    const updatedTenant = await sut.execute(storedTenant.id, data)

    expect(updatedTenant.id).toBe(storedTenant.id)
    expect(updatedTenant.name).toBe(data.name)
    expect(updatedTenant.cnpj).toBe(data.cnpj)
    expect(updatedTenant.actived).toBe(data.actived)
  })

  it('Should throw an error when tenant is not found', async () => {
    const data: TenantDTO = mockCreateTenant()

    await expect(sut.execute('non-existent-id', data)).rejects.toThrowError('Tenant not found')
  })

  it('Should throw an error if the CNPJ already exists', async () => {
    const data = mockCreateTenant()
    const newTenant = await repository.create({ ...data })

    data.cnpj = storedTenant.cnpj

    await expect(sut.execute(newTenant.id, data)).rejects.toThrow(ConflictError)
  })
})
