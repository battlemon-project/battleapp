import { ProviderData, NftMetaData } from 'lemon';
import useSWR from "swr";

//const fetcher = (url: string) => fetch(url).then((res) => res.json());

const tokenTypes: {[key: string]: { storageUrl: string, providerUrl: string, dummyImage: string }} = {
  [process.env.NEXT_PUBLIC_ITEMS_CONTRACT!]: {
    storageUrl: 'https://storage-testnet.battlemon.com/v1/items/',
    providerUrl: `/api/provider/tokens?contract=${process.env.NEXT_PUBLIC_ITEMS_CONTRACT}`,
    dummyImage: '/images/shop/shadow-item.png'
  },
  [process.env.NEXT_PUBLIC_LEMONS_CONTRACT!]: {
    storageUrl: 'https://storage-testnet.battlemon.com/v1/lemons/',
    providerUrl: `/api/provider/tokens?contract=${process.env.NEXT_PUBLIC_LEMONS_CONTRACT}`,
    dummyImage: '/images/shop/shadow-lemon.png'
  }
}

interface UseFetcherProps {
  contract: string
  balance: number
}

const fetcher = async ({contract, balance}: UseFetcherProps) => {
  const { providerUrl, storageUrl, dummyImage } = tokenTypes[contract];
  if (!balance) return [];
  const providerResponse = await fetch(providerUrl);
  const providerData: ProviderData = await providerResponse.json();
  const f = async (url: string) => {
    try {
      const res = await fetch(url)
      const json = await res.json()
      return json;
    } catch(e) {
      return {
        image: dummyImage
      };
    }
  }
  return Promise.all(providerData.ownedNfts.map(({ tokenId }) => f(storageUrl + tokenId)))
}

export function useFetcher({ contract, balance }: UseFetcherProps) {
  const { data, mutate } = useSWR<NftMetaData[]>({contract, balance}, fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false })

  return {
    data,
    mutate
  };
}