import { z } from 'zod'

const isNumeric = (str: string) => /^\d+$/.test(str)

const cnpjValidator = z.string().refine(
  (cnpj) => cnpj.length === 14 && isNumeric(cnpj),
  {
    message: 'CNPJ must be exactly 14 numeric characters',
  }
)

export const tenantSchema = z.object({
  name: z.string(),
  cnpj: cnpjValidator,
  actived: z.boolean(),
})

export type TenantDTO = z.infer<typeof tenantSchema>
