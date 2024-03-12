import { NftMetaData } from 'lemon';

export type FetcherTypes = 'lemon' | 'item' | 'gem' | 'pickaxe' | 'sticker'

function tokenTypes(type: FetcherTypes, contract: string): ({ storageUrl: string, providerUrl: string, dummyImage: string }) {
  let providerUrl: string | undefined = '';
  let storage: string | undefined;
  if ([
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_GEMS,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_PICKAXES,
    process.env.NEXT_PUBLIC_CONTRACT_POLYGON_STICKERS
  ].includes(contract)) {
    providerUrl = `/api/provider/tokens?contract=${contract}`
    storage = process.env.NEXT_PUBLIC_STORAGE_POLYGON_URL;
  } else if ([
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_ITEMS,
    process.env.NEXT_PUBLIC_CONTRACT_LINEA_LEMONS
  ].includes(contract)) {
    providerUrl = `/api/graph/tokens?contract=${contract}`
    storage = process.env.NEXT_PUBLIC_STORAGE_LINEA_URL;
  } else {
    providerUrl = `/api/graph/tokens?contract=${contract}`
  }

  // if (type == 'lemon') {
  //   providerUrl = `/api/graph/lemons?contract=${contract}`
  // }

  return {
    storageUrl: `${storage}/v1/${type}s/`,
    providerUrl,
    dummyImage: `/images/hub/empty-${type}.png`
  }
}

export interface ProviderData {
  ownedNfts: { tokenId: number, tokenUri: string, dungeonSenderId?: string }[]
  pageKey: string | undefined
  totalCount: number
}

export interface UseFetcherResult {
  tokens: NftMetaData[],
  pageKey?: string
}

export interface UseFetcherProps {
  pageSize: number
  pageKey?: string
  chainId: number
  type: FetcherTypes
}

export const getFromStorage = async ({ type, contract, tokenId }: { type: FetcherTypes, contract: string, tokenId: number }) => {
  const { storageUrl } = tokenTypes(type, contract);
  const res = await fetch(storageUrl + tokenId)
  const json: NftMetaData = await res.json()
  json.tokenId = tokenId;
  return json;
}

export const fetcher = ({ type, pageSize, pageKey, chainId }: UseFetcherProps) => async (contract: string): Promise<UseFetcherResult> => {
  const { providerUrl, dummyImage } = tokenTypes(type, contract);
  const providerResponse = await fetch(`${providerUrl}&pageSize=${pageSize}&pageKey=${pageKey || ''}&chainId=${chainId}`);
  const providerData: ProviderData = await providerResponse.json();

  const f = async (tokenId: number, dungeonSenderId?: string) => {
    try {
      const nft = await getFromStorage({ type, contract, tokenId });
      nft.dungeonSenderId = dungeonSenderId;
      return nft;
    } catch(e) {
      const empty: NftMetaData = {
        tokenId: -1*tokenId,
        image: dummyImage,
        dungeonSenderId: dungeonSenderId,
        properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
      }
      return empty;
    }
  }
  const tokens: NftMetaData[] = await Promise.all(providerData.ownedNfts.map(({ tokenId, dungeonSenderId }) => f(tokenId, dungeonSenderId)))
  return {
    tokens,
    pageKey: providerData.pageKey
  }
}
 
export const simpleFetcher = ({ type, pageSize, pageKey, chainId }: UseFetcherProps) => async (contract: string): Promise<UseFetcherResult> => {
  const { providerUrl } = tokenTypes(type, contract);
  const providerResponse = await fetch(`${providerUrl}&pageSize=${pageSize}&pageKey=${pageKey || ''}&chainId=${chainId}&withMetadata=true`);
  const providerData: ProviderData = await providerResponse.json();
  console.log(providerData)
  const tokens: NftMetaData[] = providerData.ownedNfts.map(nft => ({ tokenId: nft.tokenId, image: nft.tokenUri + '.png' })) as NftMetaData[]
  return {
    tokens,
    pageKey: providerData.pageKey
  }
}