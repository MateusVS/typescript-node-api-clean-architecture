import { User } from '@domain/entities/user.entity'
import { UserDTO } from '../dto/users/user.dto'

abstract class UsersRepository {
  abstract create(dto: UserDTO): Promise<User>
  abstract findAllByTenant(tenantId: string): Promise<User[] | null>
  abstract findOne(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract update(id: string, dto: UserDTO): Promise<User>
  abstract disable(id: string): Promise<void>
}

export { UsersRepository }
