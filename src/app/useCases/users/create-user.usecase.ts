import { CreateUserDTO } from '@app/dto/users/create-user.dto'
import { UsersRepository } from '@app/repositories/users.repository'
import { UsersService } from '@app/services/users.service'
import { User } from '@domain/entities/user.entity'
import { Hasher } from '@domain/protocols'
import { File } from '@domain/protocols/file'

class CreateUserUseCase {
  constructor(
    private repository: UsersRepository,
    private service: UsersService,
    private hasherService: Hasher,
  ) {}

  async execute(user: CreateUserDTO, file?: File): Promise<User> {
    const { email, password } = user

    await this.service.checkIfEmailAlreadyExists(email)

    user.password = await this.hasherService.encrypt(password)
    user.avatarUrl = this.service.getAvatarUrl(file)

    return await this.repository.create(user)
  }
}

export { CreateUserUseCase }
