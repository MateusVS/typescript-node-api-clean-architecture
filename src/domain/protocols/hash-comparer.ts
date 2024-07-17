interface HashComparer  {
  compare: (plaitext: string, digest: string) => Promise<boolean>
}

export { HashComparer  }
