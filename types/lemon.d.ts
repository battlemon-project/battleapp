declare module 'lemon' {
  interface PropertiesType {
    teeth: string,
    eyes: string,
    exo_top: string,
    exo_bot: string,
    feet?: string,
    hands: string,
    head: string,
    hair?: string,
    scar?: string
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
      properties: PropertiesType
    }
  }

  
  interface RequestLemonsType {
    tokens: LemonType[] | undefined,
    error?: string
  }
}