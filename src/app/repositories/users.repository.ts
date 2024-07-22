import { User } from '@domain/entities/user.entity'
import { CreateUserDTO, UpdateUserDTO } from '../dto/users'

abstract class UsersRepository {
  abstract create(dto: CreateUserDTO): Promise<User>
  abstract findAllByTenant(tenantId: string): Promise<User[] | null>
  abstract findOne(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract update(id: string, dto: UpdateUserDTO): Promise<User>
  abstract disable(id: string): Promise<void>
  abstract authenticate(email: string, password: string): Promise<User | null>
}

export { UsersRepository }
