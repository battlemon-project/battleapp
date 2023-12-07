import { useItemMint as generatedUseItemMint } from './generated';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useWaitForTransaction } from 'wagmi';

export function useItemMint() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
 
  const itemMint = address && generatedUseItemMint({
    address: process.env.NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
    args: [address],
    value: parseEther('0.00001')
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