import { UsersRepository } from '@app/repositories/users.repository'
import { UpdateUserDTO } from '@app/dto/users'
import { User } from '@domain/entities/user.entity'
import { isNullOrEmpty } from '@infra/helpers/string-functions'
import { Hasher } from '@domain/protocols'
import { UsersService } from '@app/services/users.service'
import { File } from '@domain/protocols/file'

class UpdateUserUseCase {
  constructor(
    private repository: UsersRepository,
    private service: UsersService,
    private hasherService: Hasher,
  ) {}

  async execute(id: string, user: UpdateUserDTO, file?: File): Promise<User> {
    const { password } = user

    if (!isNullOrEmpty(password)) {
      user.password = await this.hasherService.encrypt(password!)
    }

    user.avatarUrl = this.service.getAvatarUrl(file)

    return await this.repository.update(id, user)
  }
}

export { UpdateUserUseCase }
