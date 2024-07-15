import { faker } from '@faker-js/faker'

export const mockTimestamps = () => ({
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
})
