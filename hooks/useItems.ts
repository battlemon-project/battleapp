import { useItemProxyMint, useItemBalanceOf } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { useFetcher } from './useFetcher';

export function useItems() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();

  const { data: tokens, mutate: refreshTokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, isLoading } = useFetcher({ 
    contract: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    pageSize: 100
  })
  
  const itemMintRandom = address && useItemProxyMint({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    args: [address, 0]
  })

  const itemMintResult = useWaitForTransaction({ hash: itemMintRandom?.data?.hash });
  
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
  }, [itemMintResult])

  return {
    itemMint: itemMintRandom?.write || (() => {}),
    itemStatus: status,
    tokens,
    isLoading,
    refreshTokens,
    nextTokens,
    isNextTokens,
    prevTokens,
    isPrevTokens
  };
}