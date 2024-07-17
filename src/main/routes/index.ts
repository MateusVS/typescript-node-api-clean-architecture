import { Router } from 'express'
import { tenantsRoutes } from './tenants.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/tenants', tenantsRoutes)
routes.use('/users', usersRoutes)

export default routes
