import 'dotenv/config'
import { Decrypter, Encrypter } from '@domain/protocols'
import jwt from 'jsonwebtoken'

class JWTService implements Encrypter, Decrypter {
  private secret: string

  constructor() {
    this.secret = process.env.JWT_SECRET!
  }

  async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret)
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}

export { JWTService }
