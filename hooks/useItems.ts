import { TokenIpfsType, TokenType } from 'lemon';
import { useItemProxyMint, useItemBalanceOf } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import useSWR from "swr";

//const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fetcher = async (url: string) => {
  const graphResponse = await fetch(url);
  const tokensList: TokenType[] = await graphResponse.json();
  const ipfs = 'https://storage-testnet.battlemon.com/v1/items/';
  const f = async (url: string) => {
    try {
      const res = await fetch(url)
      const json = await res.json()
      return json;
    } catch(e) {
      return {
        image: '/images/shop/shadow-item.png'
      };
    }
  }
  return Promise.all(tokensList.map(({ id }) => f(ipfs + id)))
}


export function useItems() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  const { data: itemTokens, mutate: refreshItemTokens  } = useSWR<TokenIpfsType[]>(`/api/graph/items?address=${address}`, fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false })
  
  const itemMintRandom = address && useItemProxyMint({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    args: [address, 0]
  })

  const itemMintResult = useWaitForTransaction({ hash: itemMintRandom?.data?.hash });

  const itemBalance = address && useItemBalanceOf({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    args: [address]
  })
  
  useEffect(() => {
    if (itemMintRandom?.status === 'loading' || itemMintRandom?.status === 'success') {
      setStatus('loading')
    };
    if (itemMintRandom?.status === 'error') {
      setStatus('error')
    };
  }, [itemMintRandom?.status])

  useEffect(() => {
    if (!itemMintResult.isSuccess) return;
    setStatus('success')
    itemBalance?.refetch()
  }, [itemMintResult])

  return {
    itemMint: itemMintRandom?.write || (() => {}),
    itemBalance: parseInt(itemBalance?.data?.toString() || '0') || undefined,
    itemStatus: status,
    itemTokens,
    refreshItemTokens
  };
}