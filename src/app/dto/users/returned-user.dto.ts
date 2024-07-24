import { z } from 'zod'

const returnedUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string(),
  actived: z.boolean(),
  tenantId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tenant: z.object({
    id: z.string().uuid(),
    name: z.string(),
    cnpj: z.string(),
    actived: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }).nullable().optional(),
})

type ReturnedUserDTO = z.infer<typeof returnedUserSchema>

export { ReturnedUserDTO }
