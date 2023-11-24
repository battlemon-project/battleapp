import { ProviderData, NftMetaData } from 'lemon';
import { useState } from 'react';
import useSWR from "swr";

//const fetcher = (url: string) => fetch(url).then((res) => res.json());

const tokenTypes: {[key: string]: { storageUrl: string, providerUrl: string, dummyImage: string }} = {
  [process.env.NEXT_PUBLIC_ITEMS_CONTRACT!]: {
    storageUrl: 'https://storage-testnet.battlemon.com/v1/items/',
    providerUrl: `/api/provider/tokens?contract=${process.env.NEXT_PUBLIC_ITEMS_CONTRACT}`,
    dummyImage: '/images/hub/empty-item.png'
  },
  [process.env.NEXT_PUBLIC_LEMONS_CONTRACT!]: {
    storageUrl: 'https://storage-testnet.battlemon.com/v1/lemons/',
    providerUrl: `/api/provider/tokens?contract=${process.env.NEXT_PUBLIC_LEMONS_CONTRACT}`,
    dummyImage: '/images/hub/empty-lemon.png'
  }
}

interface UseFetcherProps {
  contract: string
  balance: number,
  pageSize: number
}


export function useFetcher({ contract, balance, pageSize }: UseFetcherProps) {
  const [currPageKey, setCurrPageKey] = useState<string>('');
  const [nextPageKey, setNextPageKey] = useState<string>('');
  const [prevPageKey, setPrevPageKey] = useState<string>('');
  const [isNextTokens, setIsNextTokens] = useState<boolean>(false);
  const [isPrevTokens, setIsPrevTokens] = useState<boolean>(false);

  const nextTokens = async () => {
    setNextPageKey(getNext(nextPageKey, pageSize))
    setCurrPageKey(nextPageKey)
    setPrevPageKey(currPageKey)
    setIsPrevTokens(true)
  }
  
  const prevTokens = async () => {
    setPrevPageKey(getNext(prevPageKey, -1*pageSize))
    setCurrPageKey(prevPageKey)
    setNextPageKey(currPageKey)
    setIsNextTokens(true)
  }

  function to0x(num: string) {
    while (num.length < 64) num = "0" + num;
    return '0x' + num;
  }

  const getNext = (pageKey: string, pageSize: number) => {
    const decoded = atob(pageKey);
    const parts = decoded.split(':')
    const currentDecimal = Number(parts[1]) || 0
    if (currentDecimal < 1) {
      console.log(currentDecimal)
      setIsPrevTokens(false);
      return '';
    }
    const hex = (currentDecimal + pageSize).toString(16);
    
    parts[1] = to0x(hex);
    const encoded = btoa(parts.join(':'))
    return encoded;
  }

  const fetcher = async ({contract, balance}: UseFetcherProps) => {
    const { providerUrl, storageUrl, dummyImage } = tokenTypes[contract];
    if (!balance) return [];
    const providerResponse = await fetch(`${providerUrl}&pageSize=${pageSize}&pageKey=${currPageKey || ''}`);
    const providerData: ProviderData = await providerResponse.json();
    if (providerData.pageKey) {
      setNextPageKey(providerData.pageKey);
      setIsNextTokens(true);
    } else {
      setIsNextTokens(false);
    }
    const f = async (tokenId: number) => {
      try {
        const res = await fetch(storageUrl + tokenId)
        const json: NftMetaData = await res.json()
        json.tokenId = tokenId;
        return json;
      } catch(e) {
        const empty: NftMetaData = {
          tokenId: NaN,
          image: dummyImage
        }
        return empty;
      }
    }
    return Promise.all(providerData.ownedNfts.map(({ tokenId }) => f(tokenId)))
  }

  const { data, mutate, isLoading } = useSWR<NftMetaData[]>({ contract, balance, currPageKey }, fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false })

  return {
    data,
    isLoading,
    mutate,
    isNextTokens,
    isPrevTokens,
    nextTokens,
    prevTokens,
  };
}