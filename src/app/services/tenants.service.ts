import { TenantsRepository } from '@app/repositories/tenants.repository'
import { ConflictError } from '@main/errors/conflict.error'

class TenantsService {
  constructor(private repository: TenantsRepository) {}

  async checkIfCnpjAlreadyExists(cnpj: string): Promise<void> {
    const tenant = await this.repository.findByCnpj(cnpj)

    if (tenant) {
      throw new ConflictError('CNPJ already exists')
    }
  }
}

export { TenantsService }
