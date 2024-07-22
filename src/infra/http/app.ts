import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from '@main/routes'
import { errorMiddleware } from '@main/middlewares/error.middleware'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', routes)
app.use(errorMiddleware)

export { app }
