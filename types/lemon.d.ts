
declare module 'lemon' {
  interface ItemType {
    flavour: string,
    type: string,
    level: number
  }

  interface NftMetaData {
    tokenId: number
    image: sring
    properties: PropertiesType
    original?: NftMetaData
  }

  interface PropertiesList {
    [key: string]: string[]
  }
  
  interface PropertiesType {
    dna: string
    type: string
    traits: {
      [key: string]: string | undefined
    }
    items: {
      [key: string]: string | undefined
    }
    dress: number[]
    name: string
  }
  

  type ItemsArray = (NftMetaData | undefined)[]
}
