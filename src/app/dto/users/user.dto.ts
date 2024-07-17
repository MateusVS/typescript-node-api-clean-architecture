import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  avatarUrl: z.string().nullable().optional(),
  actived: z.boolean(),
  tenantId: z.string(),
})

export const updateUserSchema = z.object({
  name: z.string(),
  password: z.string().min(8).nullable(),
  avatarUrl: z.string().nullable().optional(),
  actived: z.boolean(),
  tenantId: z.string(),
})

type CreateUserDTO = z.infer<typeof createUserSchema>
type UpdateUserDTO = z.infer<typeof updateUserSchema>

export { CreateUserDTO, UpdateUserDTO }

