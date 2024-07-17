import { UsersController } from '@app/controllers/users.controller'
import { UsersService } from '@app/services/users.service'
import {
  CreateUserUseCase,
  DisableUserUseCase,
  ListUsersByTenantUseCase,
  ShowUserUsecase,
  UpdateUserUseCase,
} from '@app/useCases/users'
import { BcryptService } from '@infra/cryptography/bcrypt.service'
import { PrismaUsersRepository } from '@infra/database/prisma-repositories/prisma-users.repository'

const repository = new PrismaUsersRepository()

const service = new UsersService(repository)

const hasher = new BcryptService()

const createUserUseCase = new CreateUserUseCase(repository, service, hasher)
const updateUsertUseCase = new UpdateUserUseCase(repository, service, hasher)
const listUsersByTenantUseCase = new ListUsersByTenantUseCase(repository)
const showUserUsecase = new ShowUserUsecase(repository)
const disableUserUseCase = new DisableUserUseCase(repository)

const usersController = new UsersController(
  createUserUseCase,
  updateUsertUseCase,
  showUserUsecase,
  listUsersByTenantUseCase,
  disableUserUseCase,
)

export { usersController }
