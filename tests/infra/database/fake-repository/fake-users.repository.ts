import { CreateUserDTO, UpdateUserDTO } from '@app/dto/users'
import { UsersRepository } from '@app/repositories/users.repository'
import { User } from '@domain/entities/user.entity'
import { faker } from '@faker-js/faker'

class FakeUsersRepository extends UsersRepository {
  public data: User[] = []

  async create(dto: CreateUserDTO): Promise<User> {

    const { name, actived, email, password, tenantId, avatarUrl } = dto

    const currentDate = new Date()

    const user: User = new User({
      id: faker.string.uuid(),
      name,
      actived,
      email,
      password,
      tenantId,
      avatarUrl: avatarUrl ?? '',
      createdAt: currentDate,
      updatedAt: currentDate,
    })

    this.data.push(user)

    return user
  }

  async findAllByTenant(tenantId: string): Promise<User[] | null> {
    const users = this.data.filter(user => user.tenantId === tenantId)
    return users.length > 0 ? users : null
  }

  async findOne(id: string): Promise<User | null> {
    const user = this.data.find(user => user.id === id)
    return user ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.data.find(user => user.email === email)
    return user ?? null
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    const userIndex = this.data.findIndex(user => user.id === id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...this.data[userIndex],
      ...dto,
      password: this.data[userIndex].password,
      avatarUrl: dto.avatarUrl ?? this.data[userIndex].avatarUrl,
      updatedAt: new Date(),
    }

    this.data[userIndex] = updatedUser

    return updatedUser
  }

  async disable(id: string): Promise<void> {
    const userIndex = this.data.findIndex(user => user.id === id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.data[userIndex].actived = false
    this.data[userIndex].updatedAt = new Date()
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const user = this.data.find(
      user => user.email === email && user.password === password,
    )

    return user ?? null
  }
}

export { FakeUsersRepository }
