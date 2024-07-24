import { createSessionSchema } from '@app/dto/session/create-session.dto'
import {
  mockInvalidEmailSession,
  mockInvalidPasswordSession,
  mockSession,
} from 'tests/domain/mocks/session-mock'
import { describe, expect, it } from 'vitest'

describe('CreateSession DTO Validation', () => {
  it('Should validate a valid session object', () => {
    const validSession = mockSession()

    const result = createSessionSchema.safeParse(validSession)

    expect(result.success).toBe(true)
  })

  it('Should fail validation for invalid email', () => {
    const invalidSession = mockInvalidEmailSession()

    const result = createSessionSchema.safeParse(invalidSession)

    expect(result.success).toBe(false)
    expect(result.error!.errors[0].message).toBe('Invalid email')
  })

  it('Should fail validation for empty password', () => {
    const invalidSession = mockInvalidPasswordSession()

    const result = createSessionSchema.safeParse(invalidSession)

    expect(result.success).toBe(false)
    expect(result.error!.errors[0].message).toBe('String must contain at least 8 character(s)')
  })
})
