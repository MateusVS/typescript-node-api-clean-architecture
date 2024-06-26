import { Router } from 'express'
import { tenantsRoutes } from './tenants.routes'

const routes = Router()

routes.use('/tenants', tenantsRoutes)

export default routes
