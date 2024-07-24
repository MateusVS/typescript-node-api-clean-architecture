import { z } from 'zod'

export const sessionValuesSchema = z.object({
  token: z.string(),
  userId: z.string().uuid(),
  userName: z.string(),
  tenantId: z.string().uuid(),
  tenantName: z.string(),
})

type SessionValueDTO = z.infer<typeof sessionValuesSchema>

export { SessionValueDTO }
