import { Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { usersController } from '../factories'
import { createUserSchema, updateUserSchema } from '@app/dto/users'

const usersRoutes = Router()

const uploadOptions = { single: true, fieldName: 'file' }

usersRoutes.get('/', routerAdapter(usersController, 'list'))
usersRoutes.get('/:id', routerAdapter(usersController, 'show'))
usersRoutes.post('/', routerAdapter(usersController, 'create', createUserSchema, uploadOptions))
usersRoutes.put('/:id', routerAdapter(usersController, 'update', updateUserSchema, uploadOptions))
usersRoutes.patch('disable/:id', routerAdapter(usersController, 'disable'))

export { usersRoutes }
