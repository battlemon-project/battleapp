import { TokenIpfsType, TokenType } from 'lemon';
import { useLemonProxyMint, useLemonBalanceOf } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import useSWR from "swr";

//const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fetcher = async (url: string) => {
  const graphResponse = await fetch(url);
  const tokensList: TokenType[] = await graphResponse.json();
  const ipfs = 'https://storage-testnet.battlemon.com/v1/lemons/';
  const f = async (url: string) => {
    const res = await fetch(url)
    const json = await res.json()
    return json;
  }
  return Promise.all(tokensList.map(({ id }) => f(ipfs + id)))
}

export function useLemons() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  const { data: lemonTokens, mutate: refreshLemonTokens  } = useSWR<TokenIpfsType[]>(`/api/graph/lemons?address=${address}`, fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false })
  
  const lemonSafeMint = address && useLemonProxyMint({
    address: process.env.NEXT_PUBLIC_LEMONS_CONTRACT as '0x',
    args: [1]
  })

  const lemonMintResult = useWaitForTransaction({ hash: lemonSafeMint?.data?.hash });

  const lemonBalance = address && useLemonBalanceOf({
    address: process.env.NEXT_PUBLIC_LEMONS_CONTRACT as '0x',
    args: [address]
  })
  
  useEffect(() => {
    if (lemonSafeMint?.status === 'loading' || lemonSafeMint?.status === 'success') {
      setStatus('loading')
    };
    if (lemonSafeMint?.status === 'error') {
      setStatus('error')
    };
  }, [lemonSafeMint?.status])

  useEffect(() => {
    if (!lemonMintResult.isSuccess) return;
    setStatus('success')
    lemonBalance?.refetch()
  }, [lemonMintResult])

  return {
    lemonMint: lemonSafeMint?.write || (() => {}),
    lemonBalance: parseInt(lemonBalance?.data?.toString() || '0') || undefined,
    lemonStatus: status,
    lemonTokens,
    refreshLemonTokens
  };
}