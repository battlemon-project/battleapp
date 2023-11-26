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
    traits: {
      [key: string]: string | undefined
    }
    items: {
      [key: string]: string | undefined
    }
  }

  interface NftMetaData {
    tokenId: number
    image: sring
    properties?: PropertiesType
  }

  interface ProviderData {
    ownedNfts: { tokenId: number }[]
    pageKey: string | undefined
    totalCount: number
  }
  
}
