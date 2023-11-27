import { useLemonProxyMint, useLemonBalanceOf } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { useFetcher } from './useFetcher';


export function useLemons() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  const lemonBalance = address && useLemonBalanceOf({
    address: process.env.NEXT_PUBLIC_LEMONS_CONTRACT as '0x',
    args: [address]
  })
  const { data: tokens, mutate: refreshTokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, isLoading } = useFetcher({ 
    contract: process.env.NEXT_PUBLIC_LEMONS_CONTRACT as '0x', 
    balance: Number(lemonBalance?.data),
    pageSize: 100
  })
  
  const lemonSafeMint = address && useLemonProxyMint({
    address: process.env.NEXT_PUBLIC_LEMONS_CONTRACT as '0x',
    args: [20]
  })

  const lemonMintResult = useWaitForTransaction({ hash: lemonSafeMint?.data?.hash });
  
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
    lemonBalance: Number(lemonBalance?.data),
    lemonStatus: status,
    tokens,
    isLoading,
    refreshTokens,
    nextTokens,
    isNextTokens,
    prevTokens,
    isPrevTokens
  };
}