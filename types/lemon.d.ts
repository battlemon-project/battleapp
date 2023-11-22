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
    [key: string]: string | undefined
  }

  interface TokenType {
    tokenId: string
  }
  
  interface TokenIpfsType {
    image: sring
  }
}
