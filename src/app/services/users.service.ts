import { UsersRepository } from '@app/repositories/users.repository'
import { File } from '@domain/protocols/file'
import { ConflictError } from '@main/errors/conflict.error'

class UsersService {
  constructor(private repository: UsersRepository) {}

  async checkIfEmailAlreadyExists(email: string): Promise<void> {
    const tenant = await this.repository.findByEmail(email)

    if (tenant) {
      throw new ConflictError('The email provided is already being used by another user.')
    }
  }

  getAvatarUrl(file?: File): string {
    return file ? file.path : 'default-avatar.jpg'
  }
}

export { UsersService }
