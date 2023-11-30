import { useItemProxyMint } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';

export function useItemMint(type: number) {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
 
  const itemMint = address && useItemProxyMint({
    address: process.env.NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
    args: [address, type]
  })

  const itemMintResult = useWaitForTransaction({ hash: itemMint?.data?.hash });
  
  useEffect(() => {
    if (itemMint?.status === 'loading' || itemMint?.status === 'success') {
      setStatus('loading')
    };
    if (itemMint?.status === 'error') {
      setStatus('error')
    };
  }, [itemMint?.status])

  useEffect(() => {
    if (!itemMintResult.isSuccess) return;
    setStatus('success')
  }, [itemMintResult])

  return {
    itemMint: itemMint?.write || (() => {}),
    itemMintStatus: status
  };
}