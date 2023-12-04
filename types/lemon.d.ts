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

  type ItemsArray = (NftMetaData | undefined)[]
}
