import { UsersRepository } from '@app/repositories/users.repository'
import { prisma } from '../prisma'
import { User } from '@domain/entities/user.entity'
import { CreateUserDTO, UpdateUserDTO } from '@app/dto/users/user.dto'
import { isNullOrEmpty } from '@infra/helpers/string-functions'

class PrismaUsersRepository extends UsersRepository {
 async create(user: CreateUserDTO): Promise<User> {
    const data = {
      ...user,
      avatarUrl: user.avatarUrl!,
    }

    return await prisma.user.create({ data })
  }

  async findAllByTenant(tenantId: string): Promise<User[] | null> {
    return await prisma.user.findMany({
      where: { tenantId }
    })
  }

  async findOne(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email }
    })
  }

  async update(id: string, user: UpdateUserDTO): Promise<User> {
    const { name, actived, avatarUrl, password, tenantId } = user

    const passwordOrUndefined = isNullOrEmpty(password) ? undefined : password!

    return await prisma.user.update({
      where: { id },
      data: {
        name,
        avatarUrl: avatarUrl!,
        actived,
        password: passwordOrUndefined,
        tenantId,
      },
    })
  }

  async disable(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { actived: false },
    })
  }

}

export { PrismaUsersRepository }
