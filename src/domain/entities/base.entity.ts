type baseEntityProps = {
  id: string
  createdAt: Date
  updatedAt: Date
}

abstract class baseEntity {
  id: string
  createdAt: Date
  updatedAt: Date

  protected constructor(entity: baseEntityProps) {
    this.id = entity.id
    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt
  }
}

export { baseEntity }
