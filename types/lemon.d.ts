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

  interface NftMetaData {
    image: sring
  }

  interface ProviderData {
    ownedNfts: { tokenId: number }[]
    pageKey: string | undefined
    totalCount: number
  }
  
}
