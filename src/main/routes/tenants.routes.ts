import { Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { tenantsController } from '../factories'

const tenantsRoutes = Router()

tenantsRoutes.get('/', routerAdapter(tenantsController, 'list'))
tenantsRoutes.get('/:id', routerAdapter(tenantsController, 'show'))
tenantsRoutes.post('/', routerAdapter(tenantsController, 'create'))
tenantsRoutes.put('/:id', routerAdapter(tenantsController, 'update'))
tenantsRoutes.patch('disable/:id', routerAdapter(tenantsController, 'disable'))

export { tenantsRoutes }
