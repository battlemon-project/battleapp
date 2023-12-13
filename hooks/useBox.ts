import { useBoxBuyCheapBox } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'react-toastify';

export function useBox() {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();

  const fee = useFeeData()
  const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(3) : undefined
  
  const buyCheapBox = address && useBoxBuyCheapBox({
    address: process.env.NEXT_PUBLIC_BOXES_CONTRACT as '0x',
    value: parseEther('0.0033'),
    gasPrice: gasPrice,
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
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