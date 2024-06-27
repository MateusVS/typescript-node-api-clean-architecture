import { TenantsController } from '../../app/controllers/tenants.controller'
import {
  CheckCnpjExistsUseCase,
  CreateTenantsUseCase,
  DisableTenantUseCase,
  ListAllTenantsUsecase,
  ShowTenantUsecase,
  UpdateTenantsUseCase,
} from '../../app/useCases/tenants'
import { PrismaTenantsRepository } from '../../infra/database/prisma-repositories'

const repository = new PrismaTenantsRepository()

const createTenantUseCase = new CreateTenantsUseCase(repository)
const updateTenantUseCase = new UpdateTenantsUseCase(repository)
const listAllTenantsUseCase = new ListAllTenantsUsecase(repository)
const showTenantUseCase = new ShowTenantUsecase(repository)
const disableTenantUseCase = new DisableTenantUseCase(repository)
const checkCnpjExistsUseCase = new CheckCnpjExistsUseCase(repository)


const tenantsController = new TenantsController(
  createTenantUseCase,
  updateTenantUseCase,
  listAllTenantsUseCase,
  showTenantUseCase,
  disableTenantUseCase,
  checkCnpjExistsUseCase,
)

export { tenantsController }
