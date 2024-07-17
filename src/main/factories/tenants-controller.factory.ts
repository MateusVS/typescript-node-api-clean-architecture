import { TenantsController } from '@app/controllers/tenants.controller'
import { TenantsService } from '@app/services/tenants.service'
import {
  CreateTenantsUseCase,
  DisableTenantUseCase,
  ListAllTenantsUsecase,
  ShowTenantUsecase,
  UpdateTenantsUseCase,
} from '@app/useCases/tenants'
import { PrismaTenantsRepository } from '@infra/database/prisma-repositories'

const repository = new PrismaTenantsRepository()

const service = new TenantsService(repository)

const createTenantUseCase = new CreateTenantsUseCase(repository, service)
const updateTenantUseCase = new UpdateTenantsUseCase(repository, service)
const listAllTenantsUseCase = new ListAllTenantsUsecase(repository)
const showTenantUseCase = new ShowTenantUsecase(repository)
const disableTenantUseCase = new DisableTenantUseCase(repository)

const tenantsController = new TenantsController(
  createTenantUseCase,
  updateTenantUseCase,
  listAllTenantsUseCase,
  showTenantUseCase,
  disableTenantUseCase,
)

export { tenantsController }
