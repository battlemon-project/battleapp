import { LemonType, RequestLemonsType } from 'lemon';
import { useLemonSafeMint, useLemonBalanceOf } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';

export function useLemon() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  
  const lemonSafeMint = address && useLemonSafeMint({
    address: process.env.NEXT_PUBLIC_LEMONS_CONTRACT as '0x',
    args: [address]
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


  const lemonTokens = async (): Promise<LemonType[] | undefined> => {
    if (!address) return;
    const fetched = await fetch(`/api/graph/lemons?address=${address}`)

    const { error, tokens }: RequestLemonsType = await fetched.json();

    if (error) {
      alert(error)
      return []
    }

    return tokens;
  };

  return {
    lemonMint: lemonSafeMint?.write || (() => {}),
    lemonBalance: parseInt(lemonBalance?.data?.toString() || '0') || undefined,
    lemonStatus: status,
    lemonTokens
  };
}