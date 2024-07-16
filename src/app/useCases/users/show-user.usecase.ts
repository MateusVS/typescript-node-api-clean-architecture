import { UsersRepository } from '@app/repositories/users.repository'
import { User } from '@domain/entities/user.entity'

class ShowUserUsecase {
  constructor(private repository: UsersRepository) { }

  async execute(id: string): Promise<User | null> {
    return await this.repository.findOne(id)
  }
}

export { ShowUserUsecase }
