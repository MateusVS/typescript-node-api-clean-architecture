import { sessionController } from '@main/factories'
import { describe, expect, it } from 'vitest'

describe('Session Controller Factory', () => {
  it('should create an instance of SessionController with mocked dependencies', () => {
    expect(sessionController).toBeDefined()

    expect(sessionController.login).toBeDefined()
  })
})
