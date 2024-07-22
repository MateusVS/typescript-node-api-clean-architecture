import { BcryptService } from '@infra/cryptography'
import { prisma } from '../prisma'

async function main() {
  const hasher = new BcryptService()

  const password = await hasher.encrypt('password')

  await prisma.tenant.create({
    data: {
      name: 'admin',
      cnpj: '111111111111111111',
      actived: true,
      users: {
        create: [
          {
            email: 'admin@admin.com',
            name: 'Admin User',
            password: password,
            actived: true,
            avatarUrl: 'default-avatar.jpg'
          }
        ],
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
