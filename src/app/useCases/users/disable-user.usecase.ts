import { UsersRepository } from '@app/repositories/users.repository'

class DisableUserUseCase {
  constructor(private repository: UsersRepository) { }

  async execute(id: string): Promise<void> {
    return await this.repository.disable(id)
  }
}

export { DisableUserUseCase }
