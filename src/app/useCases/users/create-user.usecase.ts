import { CreateUserDTO } from '@app/dto/users/user.dto'
import { UsersRepository } from '@app/repositories/users.repository'
import { User } from '@domain/entities/user.entity'
import { encrypt } from '@infra/lib/bcrypt'

class CreateUserUseCase {
  constructor(private repository: UsersRepository) {}

  async execute(user: CreateUserDTO): Promise<User> {
    await this.checkIfEmailExist(user.email)

    user.password = this.encryptPassword(user.password)

    return await this.repository.create(user)
  }

  private async checkIfEmailExist(email: string): Promise<void> {
    const user = await this.repository.findByEmail(email)

    if (user) {
      throw new Error(
        'O e-mail informado já está sendo utilizado por outro usuário',
      )
    }
  }

  private encryptPassword(password: string): string {
    return encrypt(password)
  }
}

export { CreateUserUseCase }
