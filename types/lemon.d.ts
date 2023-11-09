declare module 'lemon' {
  interface TraitType {
    flavour: string
    type: string
  }

  interface LemonType {
    id: string
    tokenId: string
    tokenUri: string
    metaData: {
      id: string
      description: string
      image: string
      name: string
      properties: TraitType[]
    }
  }

  
  interface RequestLemonsType {
    tokens: LemonType[] | undefined,
    error?: string
  }
}