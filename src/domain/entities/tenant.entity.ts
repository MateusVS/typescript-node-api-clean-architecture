import { baseEntity } from './base.entity';

type TenantProps = {
  id: string
  name: string
  cnpj: string
  actived: boolean
  createdAt: Date
  updatedAt: Date
}

class Tenant extends baseEntity {
  name: string
  cnpj: string
  actived: boolean

  constructor(entity: TenantProps) {
    super(entity)

    this.name = entity.name
    this.cnpj = entity.cnpj
    this.actived = entity.actived
  }
}

export { Tenant }
