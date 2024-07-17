import { TenantsService } from '@app/services/tenants.service'
import { ConflictError } from '@main/errors/conflict.error'
import { FakeTenantsRepository } from 'tests/infra/database/fake-repository/fake-tenants.repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('TenantsService', () => {
  let service: TenantsService
  let repository: FakeTenantsRepository

  beforeEach(() => {
    repository = { findByCnpj: vi.fn().mockResolvedValue(false) } as any
    service = new TenantsService(repository)
  })

  describe('checkIfCnpjAlreadyExists', () => {
    it('Should throw a ConflictError if the CNPJ already exists', async () => {
      const cnpj = '64852544483083'

      repository.findByCnpj = vi.fn().mockResolvedValue(true)

      await expect(service.checkIfCnpjAlreadyExists(cnpj)).rejects.toThrow(ConflictError)
      expect(repository.findByCnpj).toHaveBeenCalledWith(cnpj)
    })
  })

  it('Should not throw an error if the CNPJ does not exist', async () => {
    const cnpj = '64852544483083'

    await expect(service.checkIfCnpjAlreadyExists(cnpj)).resolves.not.toThrow()
    expect(repository.findByCnpj).toHaveBeenCalledWith(cnpj)
  })
})
