import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'
import { HttpRequest, HttpResponse } from '@main/adapters/http.adapter'
import { TenantDTO } from '@app/dto/tenants/tenant.dto'
import { TenantsController } from '@app/controllers/tenants.controller'
import {
  CreateTenantsUseCase,
  CheckCnpjExistsUseCase,
  UpdateTenantsUseCase,
  ListAllTenantsUsecase,
  ShowTenantUsecase,
  DisableTenantUseCase,
} from '@app/useCases/tenants'
import * as httpStatus from '@infra/helpers/http-response'
import { mockCreateTenant } from 'tests/domain/mocks/tenant-mock.entity'
import { mockTimestamps } from 'tests/domain/mocks/timestamps-mock'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

describe('TenantsController', () => {
  let createTenantsUseCase: CreateTenantsUseCase
  let checkCnpjExistsUseCase: CheckCnpjExistsUseCase
  let updateTenantUseCase: UpdateTenantsUseCase
  let listAllTenantsUseCase: ListAllTenantsUsecase
  let showTenantUseCase: ShowTenantUsecase
  let disableTenantUseCase: DisableTenantUseCase
  let tenantsController: TenantsController
  let data: TenantDTO

  const { createdAt, updatedAt } = mockTimestamps()

  beforeEach(() => {
    data = mockCreateTenant()

    createTenantsUseCase = {
      execute: vi.fn().mockResolvedValue({
        id: '1',
        createdAt,
        updatedAt,
        ...data,
      })
    } as any
    checkCnpjExistsUseCase = { execute: vi.fn().mockResolvedValue(false) } as any
    updateTenantUseCase = {
      execute: vi.fn().mockResolvedValue({
        id: '1',
        createdAt,
        updatedAt,
        ...data,
      })
    } as any
    listAllTenantsUseCase = { execute: vi.fn() } as any
    showTenantUseCase = { execute: vi.fn() } as any
    disableTenantUseCase = { execute: vi.fn() } as any

    tenantsController = new TenantsController(
      createTenantsUseCase,
      updateTenantUseCase,
      listAllTenantsUseCase,
      showTenantUseCase,
      disableTenantUseCase,
      checkCnpjExistsUseCase,
    )
  })

  describe('create', () => {
    it('Should return 201 and create tenant when data is valid', async () => {
      const request: HttpRequest = { body: data }

      const response: HttpResponse = await tenantsController.create(request)

      expect(response.status).toEqual(201)
      expect(response.data).toBeDefined()
      expect(response).toEqual(httpStatus.created('Tenant Created', {
        id: '1',
        createdAt,
        updatedAt,
        ...data,
      }))
      expect(checkCnpjExistsUseCase.execute).toHaveBeenCalledWith(data.cnpj)
      expect(createTenantsUseCase.execute).toHaveBeenCalledWith(data)
    })

    it('Should return 409 when CNPJ already exists', async () => {
      checkCnpjExistsUseCase.execute = vi.fn().mockResolvedValue(true)

      const request: HttpRequest = { body: data }
      const response: HttpResponse = await tenantsController.create(request)

      expect(response.status).toBe(409)
      expect(response).toEqual(httpStatus.conflict('CNPJ already exists'))
      expect(checkCnpjExistsUseCase.execute).toHaveBeenCalledWith(data.cnpj)
      expect(createTenantsUseCase.execute).not.toHaveBeenCalled()
    })

    it('Should return 400 when data is invalid', async () => {
      const invalidBody = { invalid: 'data' }
      const httpRequest: HttpRequest = { body: invalidBody }

      const httpResponse: HttpResponse = await tenantsController.create(httpRequest)

      expect(httpResponse.status).toBe(400)
      expect(createTenantsUseCase.execute).not.toHaveBeenCalled()
      expect(checkCnpjExistsUseCase.execute).not.toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('Should return 200 and update tenant when data is valid', async () => {
      const request: HttpRequest = { params: { id: '1' }, body: data }

      const response: HttpResponse = await tenantsController.update(request)

      expect(response.status).toEqual(200)
      expect(response).toEqual(httpStatus.ok('Tenant Updated', {
        id: '1',
        createdAt,
        updatedAt,
        ...data,
      }))
      expect(checkCnpjExistsUseCase.execute).toHaveBeenCalledWith(data.cnpj)
      expect(updateTenantUseCase.execute).toHaveBeenCalledWith('1', data)
    })

    it('Should return 409 when CNPJ already exists', async () => {
      checkCnpjExistsUseCase.execute = vi.fn().mockResolvedValue(true)

      const request: HttpRequest = { params: { id: '1' }, body: data }
      const response: HttpResponse = await tenantsController.update(request)

      expect(response.status).toBe(409)
      expect(response).toEqual(httpStatus.conflict('CNPJ already exists'))
      expect(checkCnpjExistsUseCase.execute).toHaveBeenCalledWith(data.cnpj)
      expect(updateTenantUseCase.execute).not.toHaveBeenCalled()
    })

    it('Should return 400 when tenant ID does not exist', async () => {
      const httpRequest: HttpRequest = {
        params: { id: 'non-existent-id' },
        body: data
      } as any

      (updateTenantUseCase.execute as Mock).mockRejectedValue(new Error('Record to update not found'))

      const httpResponse: HttpResponse = await tenantsController.update(httpRequest)

      expect(httpResponse.status).toBe(400)
      expect(updateTenantUseCase.execute).toHaveBeenCalledWith('non-existent-id', data)
    })

    it('Should return 400 when data is invalid', async () => {
      const invalidBody = { invalid: 'data' }
      const httpRequest: HttpRequest = { params: { id: '1' }, body: invalidBody } as any

      const httpResponse: HttpResponse = await tenantsController.update(httpRequest)

      expect(httpResponse.status).toBe(400)
      expect(updateTenantUseCase.execute).not.toHaveBeenCalled()
      expect(checkCnpjExistsUseCase.execute).not.toHaveBeenCalled()
    })
  })

  describe('show', () => {
    it('Should return 200 and tenant when found', async () => {
      const tenant = { id: '1', name: 'Tenant 1' }
      const httpRequest: HttpRequest = { params: { id: '1' } } as any

      (showTenantUseCase.execute as Mock).mockResolvedValue(tenant)

      const httpResponse: HttpResponse = await tenantsController.show(httpRequest)

      expect(httpResponse.status).toEqual(200)
      expect(httpResponse.data).toBeDefined()
      expect(httpResponse).toEqual(httpStatus.ok('Tenant Found', tenant))
      expect(showTenantUseCase.execute).toHaveBeenCalledWith('1')
    })

    it('Should return 204 when tenant is not found', async () => {
      const httpRequest: HttpRequest = { params: { id: 'non-existent-id' } } as any

      (showTenantUseCase.execute as Mock).mockResolvedValue(null)

      const httpResponse: HttpResponse = await tenantsController.show(httpRequest)

      expect(httpResponse.status).toBe(204)
      expect(showTenantUseCase.execute).toHaveBeenCalledWith('non-existent-id')
    })
  })

  describe('list', () => {
    it('Should return 200 and list of tenants', async () => {
      const tenants = [
        {
          id: '1',
          name: 'Tenant 1'
        },
        {
          id: '2',
          name: 'Tenant 2'
        }
      ]

      const httpRequest: HttpRequest = {} as any

      (listAllTenantsUseCase.execute as Mock).mockResolvedValue(tenants)

      const httpResponse: HttpResponse = await tenantsController.list(httpRequest)

      expect(httpResponse.status).toEqual(200)
      expect(httpResponse.data).toBeDefined()
      expect(httpResponse).toEqual(httpStatus.ok('Tenants Found', tenants))
      expect(listAllTenantsUseCase.execute).toHaveBeenCalled()
    })

    it('Should return 400 when an error occurs', async () => {
      const httpRequest: HttpRequest = {} as any

      (listAllTenantsUseCase.execute as Mock).mockRejectedValue(new Error('Error'))

      const httpResponse: HttpResponse = await tenantsController.list(httpRequest)

      expect(httpResponse.status).toBe(400)
      expect(listAllTenantsUseCase.execute).toHaveBeenCalled()
    })
  })

  describe('disable', () => {
    it('should return 204 when tenant is disabled', async () => {
      const httpRequest: HttpRequest = { params: { id: '1' } } as any

      const httpResponse: HttpResponse = await tenantsController.disable(httpRequest)

      expect(httpResponse.status).toEqual(204)
      expect(httpResponse.data).toBeUndefined()
      expect(httpResponse).toEqual(httpStatus.noContent('Tenant Disabled'))
      expect(disableTenantUseCase.execute).toHaveBeenCalledWith('1')
    })

    it('Should return 400 when an error occurs', async () => {
      const httpRequest: HttpRequest = { params: { id: '1' } } as any

      (disableTenantUseCase.execute as Mock).mockRejectedValue(new Error('Error'))

      const httpResponse: HttpResponse = await tenantsController.disable(httpRequest)

      expect(httpResponse.status).toBe(400)
      expect(disableTenantUseCase.execute).toHaveBeenCalledWith('1')
    })
  })
})
