import { baseEntity } from './base.entity'
import { Tenant } from './tenant.entity'

type UserProps = {
  id: string
  name: string
  email: string
  password: string
  actived: boolean
  avatarUrl: string
  tenantId: string
  createdAt: Date
  updatedAt: Date

  tenant?: Tenant
}

class User extends baseEntity {
  name: string
  email: string
  password: string
  actived: boolean
  avatarUrl: string
  tenantId: string

  tenant?: Tenant

  constructor(entity: UserProps) {
    super(entity)

    this.name = entity.name
    this.email = entity.email
    this.password = entity.password
    this.actived = entity.actived
    this.avatarUrl = entity.avatarUrl
    this.tenantId = entity.tenantId
    this.tenant = entity.tenant
  }
}

export { User }
