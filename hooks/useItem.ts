import { useItemMintRandom, useItemBalanceOf } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';

export function useItem() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  
  const itemMintRandom = address && useItemMintRandom({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    args: [address, BigInt(1)]
  })

  const itemMintResult = useWaitForTransaction({ hash: itemMintRandom?.data?.hash });

  const itemBalance = address && useItemBalanceOf({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    args: [address, BigInt(7004)]
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
    console.log(itemMintResult)
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