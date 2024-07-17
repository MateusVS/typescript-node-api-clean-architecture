interface Hasher {
  encrypt: (plaintext: string) => Promise<string>
}

export { Hasher }
