import { NftMetaData } from 'lemon';

const tokenTypes: {[key: string]: { storageUrl: string, providerUrl: string, dummyImage: string }} = {
  [process.env.NEXT_PUBLIC_CONTRACT_ITEMS!]: {
    storageUrl: `${process.env.NEXT_PUBLIC_STORAGE_URL}/v1/items/`,
    providerUrl: `/api/provider/tokens?contract=${process.env.NEXT_PUBLIC_CONTRACT_ITEMS}`,
    dummyImage: '/images/hub/empty-item.png'
  },
  [process.env.NEXT_PUBLIC_CONTRACT_LEMONS!]: {
    storageUrl: `${process.env.NEXT_PUBLIC_STORAGE_URL}/v1/lemons/`,
    providerUrl: `/api/provider/tokens?contract=${process.env.NEXT_PUBLIC_CONTRACT_LEMONS}`,
    dummyImage: '/images/hub/empty-lemon.png'
  }
}

export interface ProviderData {
  ownedNfts: { tokenId: number }[]
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
}

export const getFromStorage = async ({ contract, tokenId }: { contract: string, tokenId: number }) => {
  const { storageUrl } = tokenTypes[contract];
  const res = await fetch(storageUrl + tokenId)
  const json: NftMetaData = await res.json()
  json.tokenId = tokenId;
  return json;
}

export const fetcher = ({ pageSize, pageKey }: UseFetcherProps) => async (contract: string): Promise<UseFetcherResult> => {
  const { providerUrl, storageUrl, dummyImage } = tokenTypes[contract];
  const providerResponse = await fetch(`${providerUrl}&pageSize=${pageSize}&pageKey=${pageKey || ''}`);
  const providerData: ProviderData = await providerResponse.json();

  const f = async (tokenId: number) => {
    try {
      return await getFromStorage({ contract, tokenId });
    } catch(e) {
      const empty: NftMetaData = {
        tokenId: -1*tokenId,
        image: dummyImage,
        properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [] }
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