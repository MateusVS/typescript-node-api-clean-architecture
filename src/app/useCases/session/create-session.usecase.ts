import { CreateSessionDTO } from '@app/dto/session/create-session.dto'
import { SessionValueDTO } from '@app/dto/session/session-values.dto'
import { UsersRepository } from '@app/repositories/users.repository'
import { User } from '@domain/entities/user.entity'
import { Encrypter, HashComparer } from '@domain/protocols'
import { UnauthorizedError } from '@main/errors/unauthorized.error'

class CreateSessionUseCase {
  constructor(
    private repository: UsersRepository,
    private hashCompare: HashComparer,
    private encypterService: Encrypter,
  ) {}

  async execute(credentials: CreateSessionDTO): Promise<SessionValueDTO> {
    const { email, password } = credentials

    const userAuth = await this.authenticate({ email, password })

    const token = await this.encypterService.encrypt(userAuth.id)

    const { id, name, tenant } = userAuth

    return {
      userId: id,
      userName: name,
      tenantId: tenant?.id ?? '',
      tenantName: tenant?.name ?? '',
      token,
    }
  }

  private async authenticate({ email, password }: CreateSessionDTO): Promise<User> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError('The email provided is not registered')
    }

    if (!this.hashCompare.compare(user.password, password)) {
      throw new UnauthorizedError('The email or password entered does not match!')
    }

    return user
  }
}

export { CreateSessionUseCase }
