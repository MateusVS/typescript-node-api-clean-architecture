import { tenantSchema } from '@app/dto/tenants/tenant.dto'
import {
  mockCreateTenant,
  mockInvalidCNPJLengthCreateTenant,
  mockInvalidNonNumericCNPJCreateTenant,
} from 'tests/domain/mocks/tenant-mock.entity'
import { describe, expect, it } from 'vitest'

describe('Tenant DTO Validation', () => {
  it('should validate a tenant object', () => {
    const validTenant = mockCreateTenant()

    const result = tenantSchema.safeParse(validTenant)

    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid CNPJ length', () => {
    const invalidTenant = mockInvalidCNPJLengthCreateTenant()

    const result = tenantSchema.safeParse(invalidTenant)

    expect(result.success).toBe(false)
    expect(result.error!.errors[0].message).toBe('CNPJ must be exactly 14 numeric characters')
  })

  it('should fail validation for non-numeric CNPJ', () => {
    const invalidTenant = mockInvalidNonNumericCNPJCreateTenant()

    const result = tenantSchema.safeParse(invalidTenant)

    expect(result.success).toBe(false)
    expect(result.error!.errors[0].message).toBe('CNPJ must be exactly 14 numeric characters')
  })
})
