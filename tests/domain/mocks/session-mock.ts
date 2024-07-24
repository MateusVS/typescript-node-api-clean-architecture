import { faker } from '@faker-js/faker'

export const mockSession = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockInvalidEmailSession = () => ({
  email: 'invalid-email',
  password: faker.internet.password(),
})

export const mockInvalidPasswordSession = () => ({
  email: faker.internet.email(),
  password: '',
})
