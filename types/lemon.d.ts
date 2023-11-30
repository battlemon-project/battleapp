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

  interface NftMetaData {
    tokenId: number
    image: sring
    properties: PropertiesType
    original?: NftMetaData
  }

  interface ProviderData {
    ownedNfts: { tokenId: number }[]
    pageKey: string | undefined
    totalCount: number
  }

  type ItemsArray = (NftMetaData | undefined)[]
}
