import { z } from 'zod'

export const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type CreateSessionDTO = z.infer<typeof createSessionSchema>

export { CreateSessionDTO }
