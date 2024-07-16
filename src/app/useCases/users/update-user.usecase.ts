import { UsersRepository } from '@app/repositories/users.repository'
import { UpdateUserDTO } from '@app/dto/users/user.dto'
import { User } from '@domain/entities/user.entity'
import { encrypt } from '@infra/lib/bcrypt'
import { isNullOrEmpty } from '@infra/helpers/string-functions'

class UpdateUserUseCase {
  constructor(private repository: UsersRepository) { }

  async execute(id: string, user: UpdateUserDTO): Promise<User> {
    const { password } = user

    if (!isNullOrEmpty(password)) {
      user.password = this.encryptPassword(password!)
    }

    return await this.repository.update(id, user)
  }

  private encryptPassword(password: string): string {
    return encrypt(password)
  }
}

export { UpdateUserUseCase }
