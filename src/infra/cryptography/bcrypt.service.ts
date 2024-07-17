import { HashComparer, Hasher } from '@domain/protocols'
import bcrypt from 'bcryptjs'

class BcryptService implements Hasher, HashComparer {
  async encrypt(plaintext: string): Promise<string> {
    const salt = bcrypt.genSaltSync(8)
    return await bcrypt.hash(plaintext, salt)
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest)
  }
}

export { BcryptService }
