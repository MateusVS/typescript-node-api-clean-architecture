import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { UpdateTenantsUseCase } from '@app/useCases/tenants'
import { Tenant } from '@domain/entities/tenant.entity'
import { mockCreateTenant, mockTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Update Tenant Use Case', () => {
  let repository: FakeTenantsRepository
  let sut: UpdateTenantsUseCase
  let storedTenant: Tenant

  beforeEach(async () => {
    repository = new FakeTenantsRepository()
    sut = new UpdateTenantsUseCase(repository)

    storedTenant = await repository.create(mockTenant())
  })

  it('Should update a tenant successfully', async () => {
    const data: TenantDTO = mockCreateTenant()
    const updatedTenant = await sut.execute(storedTenant.id, data)

    expect(updatedTenant).toEqual({ ...storedTenant, ...data })
    expect(updatedTenant.id).toBe(storedTenant.id)
  })

  it('Should throw an error when tenant is not found', async () => {
    const data: TenantDTO = mockCreateTenant()

    await expect(sut.execute('non-existent-id', data)).rejects.toThrowError('Tenant not found')
  })
})
