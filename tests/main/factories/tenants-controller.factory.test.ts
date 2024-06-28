import { tenantsController } from '@main/factories'
import { describe, expect, it } from 'vitest'

describe('Tenants Controller Factory', () => {
  it('should create an instance of TenantsController with mocked dependencies', () => {
    expect(tenantsController).toBeDefined()

    expect(tenantsController.create).toBeDefined()
    expect(tenantsController.update).toBeDefined()
    expect(tenantsController.show).toBeDefined()
    expect(tenantsController.list).toBeDefined()
    expect(tenantsController.disable).toBeDefined()
  })
})
