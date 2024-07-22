import { Router } from 'express'
import { tenantsRoutes } from './tenants.routes'
import { usersRoutes } from './users.routes'
import { sessionRoutes } from './session.routes'

const routes = Router()

routes.use('/authenticate', sessionRoutes)
routes.use('/tenants', tenantsRoutes)
routes.use('/users', usersRoutes)

export default routes
