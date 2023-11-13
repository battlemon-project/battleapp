declare module 'lemon' {
  interface PropertiesList {
    [key: string]: string[]
  }

  interface ItemType {
    flavour: string,
    type: string,
    level: number
  }

  interface PropertiesType {
    [key: string]: string
  }

  interface TokenType {
    id: string
    tokenId: string
  }
  
  interface RequestTokensType {
    tokens: TokensType[] | undefined,
    error?: string
  }
}
