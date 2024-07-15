import { CheckCnpjExistsUseCase } from '@app/useCases/tenants'
import { mockCreateTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Check CNPJ Exists Use Case', () => {
  let repository: FakeTenantsRepository
  let sut: CheckCnpjExistsUseCase

  beforeEach(() => {
    repository = new FakeTenantsRepository()
    sut = new CheckCnpjExistsUseCase(repository)
  })

  it('Should return true if CNPJ exists in repository', async () => {
    const data = mockCreateTenant()
    await repository.create(data)

    const result = await sut.execute(data.cnpj)

    expect(result).toBeTruthy()
  })

  it('Should return false if CNPJ does not exists in repository', async () => {
    const data = mockCreateTenant()
    await repository.create(data)

    const result = await sut.execute('12345678901234')

    expect(result).toBeFalsy()
  })
})
