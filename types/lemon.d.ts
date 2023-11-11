declare module 'lemon' {
  interface PropertiesList {
    [key: string]: string[]
  }

  interface PropertiesType {
    [key: string]: string
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