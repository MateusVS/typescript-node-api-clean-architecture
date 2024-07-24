import { describe, expect, it } from 'vitest'
import {
  mockValidSessionValues,
  mockInvalidSessionValuesMissingToken,
  mockInvalidSessionValuesInvalidUUID,
} from 'tests/domain/mocks/session-value-mock'
import { sessionValuesSchema } from '@app/dto/session/session-values.dto'

describe('Session Value DTO Validation', () => {
  it('should validate a session value object', () => {
    const validSessionValues = mockValidSessionValues()

    const result = sessionValuesSchema.safeParse(validSessionValues)

    expect(result.success).toBe(true)
  })

  it('should fail validation for missing token', () => {
    const invalidSessionValues = mockInvalidSessionValuesMissingToken()

    const result = sessionValuesSchema.safeParse(invalidSessionValues)

    expect(result.success).toBe(false)
    expect(result.error!.errors[0].message).toBe('Required')
  })

  it('should fail validation for invalid UUIDs', () => {
    const invalidSessionValues = mockInvalidSessionValuesInvalidUUID()

    const result = sessionValuesSchema.safeParse(invalidSessionValues)

    expect(result.success).toBe(false)
    expect(result.error!.errors[0].message).toBe('Invalid uuid')
  })
})
