
declare module 'lemon' {
  interface ItemType {
    flavour: string,
    type: string,
    level: number
  }

  interface NftMetaData {
    tokenId: number
    image: string
    properties: PropertiesType
    original?: NftMetaData
  }

  interface PropertiesList {
    [key: string]: string[]
  }
  
  interface DressedItemData {
    [key: string]: {
      level: number
      agility: number
      speed: number
      luck: number
      dna: string
      itemName: string
      tokenId: number
    }
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
    itemsData?: DressedItemData
    dress: number[]
    name: string
    agility: number
    speed: number
    luck: number
    level: number
  }
  
  type ItemsArray = (NftMetaData | undefined)[]
}
