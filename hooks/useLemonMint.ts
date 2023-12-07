import { useLemonMint as generatedUseLemonMint } from './generated';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useWaitForTransaction } from 'wagmi';

export function useLemonMint() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  
  const lemonMint = address && generatedUseLemonMint({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [1],
    value: parseEther('0.0000005')
  })

  const lemonMintResult = useWaitForTransaction({ hash: lemonMint?.data?.hash });
  
  useEffect(() => {
    if (lemonMint?.status === 'loading' || lemonMint?.status === 'success') {
      setStatus('loading')
    };
    if (lemonMint?.status === 'error') {
      setStatus('error')
    };
  }, [lemonMint?.status])

  useEffect(() => {
    if (!lemonMintResult.isSuccess) return;
    setStatus('success')
  }, [lemonMintResult])

  return {
    lemonMint: lemonMint?.write || (() => {}),
    lemonMintStatus: status
  };
}