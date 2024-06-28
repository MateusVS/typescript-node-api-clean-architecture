import { PrismaClient } from '@prisma/client'
import { env } from '@main/env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
