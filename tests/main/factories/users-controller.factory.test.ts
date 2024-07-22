import { usersController } from '@main/factories'
import { describe, expect, it } from 'vitest'

describe('Users Controller Factory', () => {
  it('should create an instance of UsersController with mocked dependencies', () => {
    expect(usersController).toBeDefined()

    expect(usersController.create).toBeDefined()
    expect(usersController.update).toBeDefined()
    expect(usersController.show).toBeDefined()
    expect(usersController.list).toBeDefined()
    expect(usersController.disable).toBeDefined()
  })
})
