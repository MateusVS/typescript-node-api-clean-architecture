import { z } from 'zod'

export const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type CreateSessionDTO = z.infer<typeof createSessionSchema>

export { CreateSessionDTO }
