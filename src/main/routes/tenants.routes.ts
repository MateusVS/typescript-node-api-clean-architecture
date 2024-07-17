import { Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { tenantsController } from '../factories'
import { tenantSchema } from '@app/dto/tenants/tenant.dto'

const tenantsRoutes = Router()

tenantsRoutes.get('/', routerAdapter(tenantsController, 'list'))
tenantsRoutes.get('/:id', routerAdapter(tenantsController, 'show'))
tenantsRoutes.post('/', routerAdapter(tenantsController, 'create', tenantSchema))
tenantsRoutes.put('/:id', routerAdapter(tenantsController, 'update', tenantSchema))
tenantsRoutes.patch('disable/:id', routerAdapter(tenantsController, 'disable'))

export { tenantsRoutes }
