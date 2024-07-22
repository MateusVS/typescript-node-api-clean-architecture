import { z } from 'zod'

const sessionValuesSchema = z.object({
  token: z.string(),
  userId: z.string(),
  userName: z.string(),
})

type SessionValueDTO = z.infer<typeof sessionValuesSchema>

export { SessionValueDTO }
