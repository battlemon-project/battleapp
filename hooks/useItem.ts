import { useItemProxyMint, useItemBalanceOf } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';

export function useItem() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  
  const itemMintRandom = address && useItemProxyMint({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    args: [address, 1]
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
    itemStatus: status
  };
}