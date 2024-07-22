import { createSessionSchema } from '@app/dto/session/create-session.dto'
import { routerAdapter } from '@main/adapters/router.adapter'
import { sessionController } from '@main/factories'
import { Router } from 'express'
import { AuthType } from 'src/@types/auth.types'

const sessionRoutes = Router()
const { PUBLIC } = AuthType

sessionRoutes.post('/', routerAdapter(sessionController, 'login', createSessionSchema, undefined, PUBLIC))

export { sessionRoutes }
