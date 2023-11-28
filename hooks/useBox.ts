import { useBoxBuyCheapBox } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';

export function useBox() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();

  const buyCheapBox = address && useBoxBuyCheapBox({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    value: parseEther('0.0033')
  })

  const buyCheapBoxResult = useWaitForTransaction({ hash: buyCheapBox?.data?.hash });
  
  useEffect(() => {
    if (buyCheapBox?.status === 'loading' || buyCheapBox?.status === 'success') {
      setStatus('loading')
    };
    if (buyCheapBox?.status === 'error') {
      setStatus('error')
    };
  }, [buyCheapBox?.status])

  useEffect(() => {
    if (!buyCheapBoxResult.isSuccess) return;
    setStatus('success')
  }, [buyCheapBoxResult])

  return {
    buyCheapBox: buyCheapBox?.write || (() => {}),
    boxStatus: status
  };
}