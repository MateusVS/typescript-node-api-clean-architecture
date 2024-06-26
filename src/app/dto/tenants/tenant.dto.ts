import { z } from 'zod'

const tenantSchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  actived: z.boolean(),
})

type tenant = z.infer<typeof tenantSchema>

export type TenantDTO = tenant
