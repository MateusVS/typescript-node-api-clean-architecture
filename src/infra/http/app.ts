import 'dotenv/config'
import express, { NextFunction, Request, Response }  from 'express'
import 'express-async-errors'
import cors from 'cors'
import { env } from '../env'

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  if (env.NODE_ENV !== 'production') {
    console.error(error.stack)
  }

  response.status(500).json({ message: 'Internal Server Error' })
}
