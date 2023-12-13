import { useLemonMint as generatedUseLemonMint } from './generated';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useWaitForTransaction, useFeeData } from 'wagmi';
import { toast } from 'react-toastify';

export function useLemonMint(count: number) {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();

  const batchPrice = (Number(process.env.NEXT_PUBLIC_MINT_LEMONS_PRICE) * (count || 1)).toFixed(10).replace(/\.?0+$/,"")
  console.log('price', batchPrice)
  const fee = useFeeData()
  const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(3) : undefined

  const lemonMint = address && generatedUseLemonMint({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [count || 1],
    value: parseEther(batchPrice),
    gasPrice: gasPrice,
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
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