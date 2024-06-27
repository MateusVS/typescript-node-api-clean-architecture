import { TenantsRepository } from '../../repositories/tenants.repository'

class CheckCnpjExistsUseCase {
  constructor(private repository: TenantsRepository) { }

  async execute(cnpj: string): Promise<boolean> {
    const tenant = await this.repository.findByCnpj(cnpj)

    return tenant !== null
  }
}

export { CheckCnpjExistsUseCase }
