import { Router } from 'express'
import { routerAdapter } from '../adapters/router.adapter'
import { usersController } from '../factories'
import { createUserSchema, updateUserSchema } from '@app/dto/users/user.dto'

const usersRoutes = Router()

usersRoutes.get('/', routerAdapter(usersController, 'list'))
usersRoutes.get('/:id', routerAdapter(usersController, 'show'))
usersRoutes.post('/', routerAdapter(usersController, 'create', createUserSchema, { single: true, fieldName: 'file' }))
usersRoutes.put('/:id', routerAdapter(usersController, 'update', updateUserSchema, { single: true, fieldName: 'file' }))
usersRoutes.patch('disable/:id', routerAdapter(usersController, 'disable'))

export { usersRoutes }
