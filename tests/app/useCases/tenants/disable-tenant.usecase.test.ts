import { DisableTenantUseCase } from '@app/useCases/tenants'
import { Tenant } from '@domain/entities/tenant.entity'
import { mockTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Disable Tenant Use Case', () => {
  const mockedTenant = mockTenant()

  let repository: FakeTenantsRepository
  let sut: DisableTenantUseCase
  let activeTenant: Tenant

  beforeEach(async () => {
    repository = new FakeTenantsRepository()
    sut = new DisableTenantUseCase(repository)

    activeTenant = await repository.create({ ...mockedTenant, actived: true })
  })

  it('Should disable an active Tenant', async () => {
    await sut.execute(activeTenant.id)

    const disabledTenant = await repository.findOne(activeTenant.id)
    expect(disabledTenant).toBeDefined()
    expect(disabledTenant!.actived).toBeFalsy()
    expect(disabledTenant!.updatedAt).toBeDefined()
  })

  it('Should throw error for disabling a non-existent Tenant', async () => {
    await expect(async () => {
      await sut.execute('nonexistent_id')
    }).rejects.toThrowError('Tenant not found')
  })
})
