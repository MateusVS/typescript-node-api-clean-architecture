import request from 'supertest'
import { describe, it, expect, } from 'vitest'
import { app } from '@infra/http/app'

describe('Tenants Routes', () => {
  it.skip('GET /tenants should return 200 and list all tenants', async () => {
    const response = await request(app).get('/api/tenants')

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })
   // TODO: Implementar mais testes e2e utilizando banco de dados de testes
})
