import { UsersRepository } from '@app/repositories/users.repository'
import { User } from '@domain/entities/user.entity'

class ListUsersByTenantUseCase {
  constructor(private repository: UsersRepository) { }

  async execute(tenantId: string): Promise<User[] | null> {
    return await this.repository.findAllByTenant(tenantId)
  }
}

export { ListUsersByTenantUseCase }
