import { SessionController } from '@app/controllers/session.controller'
import { CreateSessionUseCase } from '@app/useCases/session/create-session.usecase'
import { PrismaUsersRepository } from '@infra/database/prisma-repositories/prisma-users.repository'
import { BcryptService, JWTService } from '@infra/cryptography'

const repository = new PrismaUsersRepository()
const bcryptService = new BcryptService()
const jwtService = new JWTService()

const useCase = new CreateSessionUseCase(
  repository,
  bcryptService,
  jwtService,
)

const sessionController = new SessionController(useCase)

export { sessionController }
