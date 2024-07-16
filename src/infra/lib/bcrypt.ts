import bcrypt from 'bcryptjs'

export const encrypt = (param: string): string => {
  const salt = bcrypt.genSaltSync(8)
  return bcrypt.hashSync(param, salt)
}

export const compareEncryptedWord = (
  plaintext: string,
  encrypted: string,
): boolean => {
  return bcrypt.compareSync(plaintext, encrypted)
}
