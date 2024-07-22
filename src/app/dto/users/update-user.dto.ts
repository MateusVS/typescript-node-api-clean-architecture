import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string(),
  password: z.string().min(8).nullable(),
  avatarUrl: z.string().nullable().optional(),
  actived: z.boolean(),
  tenantId: z.string(),
})

type UpdateUserDTO = z.infer<typeof updateUserSchema>

export { UpdateUserDTO }
