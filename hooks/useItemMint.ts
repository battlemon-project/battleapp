import { useItemMint as generatedUseItemMint } from './generated';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useFeeData, useWaitForTransaction } from 'wagmi';
import { toast } from 'react-toastify';

export function useItemMint(count: number) {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
 
  const batchPrice = (Number(process.env.NEXT_PUBLIC_MINT_ITEMS_PRICE) * (count || 1)).toFixed(10).replace(/\.?0+$/,"")

  const fee = useFeeData()
  const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(3) : undefined
  
  const itemMint = address && generatedUseItemMint({
    address: process.env.NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
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

  const itemMintResult = useWaitForTransaction({ hash: itemMint?.data?.hash });
  
  useEffect(() => {
    if (itemMint?.status === 'loading' || itemMint?.status === 'success') {
      setStatus('loading');
    };
    if (itemMint?.status === 'error') {
      setStatus('error');
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