import { NftMetaData } from 'lemon';

const tokenTypes: {[key: string]: { storageUrl: string, providerUrl: string, dummyImage: string }} = {
  [process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS!]: {
    storageUrl: `${process.env.NEXT_PUBLIC_STORAGE_POLYGON_URL}/v1/items/`,
    providerUrl: `/api/graph/tokens?contract=${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS}`,
    dummyImage: '/images/hub/empty-item.png'
  },
  [process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS!]: {
    storageUrl: `${process.env.NEXT_PUBLIC_STORAGE_POLYGON_URL}/v1/lemons/`,
    providerUrl: `/api/graph/tokens?contract=${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS}`,
    dummyImage: '/images/hub/empty-lemon.png'
  },
  [process.env.NEXT_PUBLIC_CONTRACT_LINEA_ITEMS!]: {
    storageUrl: `${process.env.NEXT_PUBLIC_STORAGE_LINEA_URL}/v1/items/`,
    providerUrl: `/api/graph/tokens?contract=${process.env.NEXT_PUBLIC_CONTRACT_LINEA_ITEMS}`,
    dummyImage: '/images/hub/empty-item.png'
  },
  [process.env.NEXT_PUBLIC_CONTRACT_LINEA_LEMONS!]: {
    storageUrl: `${process.env.NEXT_PUBLIC_STORAGE_LINEA_URL}/v1/lemons/`,
    providerUrl: `/api/graph/tokens?contract=${process.env.NEXT_PUBLIC_CONTRACT_LINEA_LEMONS}`,
    dummyImage: '/images/hub/empty-lemon.png'
  }
}

export interface ProviderData {
  ownedNfts: { tokenId: number, tokenUri: string }[]
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
}

export const getFromStorage = async ({ contract, tokenId }: { contract: string, tokenId: number }) => {
  const { storageUrl } = tokenTypes[contract];
  const res = await fetch(storageUrl + tokenId)
  const json: NftMetaData = await res.json()
  json.tokenId = tokenId;
  return json;
}

export const fetcher = ({ pageSize, pageKey, chainId }: UseFetcherProps) => async (contract: string): Promise<UseFetcherResult> => {
  const { providerUrl, storageUrl, dummyImage } = tokenTypes[contract];
  const providerResponse = await fetch(`${providerUrl}&pageSize=${pageSize}&pageKey=${pageKey || ''}&chainId=${chainId}`);
  const providerData: ProviderData = await providerResponse.json();

  const f = async (tokenId: number) => {
    try {
      return await getFromStorage({ contract, tokenId });
    } catch(e) {
      const empty: NftMetaData = {
        tokenId: -1*tokenId,
        image: dummyImage,
        properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
      }
      return empty;
    }
  }
  const tokens: NftMetaData[] = await Promise.all(providerData.ownedNfts.map(({ tokenId }) => f(tokenId)))
  return {
    tokens,
    pageKey: providerData.pageKey
  }
}
 
export const simpleFetcher = ({ pageSize, pageKey, chainId }: UseFetcherProps) => async (contract: string): Promise<UseFetcherResult> => {
  const providerUrl = `/api/graph/tokens?contract=${contract}`;
  const providerResponse = await fetch(`${providerUrl}&pageSize=${pageSize}&pageKey=${pageKey || ''}&chainId=${chainId}&withMetadata=true`);
  const providerData: ProviderData = await providerResponse.json();
  console.log(providerData)
  const tokens: NftMetaData[] = providerData.ownedNfts.map(nft => ({ tokenId: nft.tokenId, image: nft.tokenUri + '.png' })) as NftMetaData[]
  return {
    tokens,
    pageKey: providerData.pageKey
  }
}