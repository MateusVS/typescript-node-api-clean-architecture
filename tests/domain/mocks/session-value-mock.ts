import { faker } from '@faker-js/faker'

export const mockValidSessionValues = () => ({
  token: faker.string.alphanumeric(30),
  userId: faker.string.uuid(),
  userName: faker.person.fullName(),
  tenantId: faker.string.uuid(),
  tenantName: faker.company.name(),
})

export const mockInvalidSessionValuesMissingToken = () => ({
  userId: faker.string.uuid(),
  userName: faker.person.fullName(),
  tenantId: faker.string.uuid(),
  tenantName: faker.company.name(),
})

export const mockInvalidSessionValuesInvalidUUID = () => ({
  token: faker.string.alphanumeric(30),
  userId: 'invalid-uuid',
  userName: faker.person.fullName(),
  tenantId: 'invalid-uuid',
  tenantName: faker.company.name(),
})
