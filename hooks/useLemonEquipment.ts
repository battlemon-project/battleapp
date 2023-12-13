import { useLemonChangeEquipmentBatch } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction, useFeeData } from 'wagmi';
import { toast } from 'react-toastify';

export function useLemonEquipment(lemonId: number, items: number[]) {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle' | 'process'>('idle')
  const { address }  = useAccount();
  
  const fee = useFeeData()
  const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined

  if (items.length < 10) {
    items.push(-1)
  }

  const changeEquipment = address && useLemonChangeEquipmentBatch({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [
      BigInt(lemonId),
      items.map(i => BigInt(i))
    ],
    gasPrice: gasPrice,
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const changeEquipmentResult = useWaitForTransaction({ hash: changeEquipment?.data?.hash });
  
  useEffect(() => {
    if (changeEquipment?.status === 'success') {
      setStatus('process')
    }
    if (changeEquipment?.status === 'loading') {
      setStatus('loading')
    };
    if (changeEquipment?.status === 'error') {
      setStatus('error')
    };
  }, [changeEquipment?.status])

  useEffect(() => {
    if (!changeEquipmentResult.isSuccess && !changeEquipmentResult.isError) return;
    setStatus('success')
  }, [changeEquipmentResult])

  return {
    changeEquipment: changeEquipment?.write || (() => {}),
    changeEquipmentStatus: status
  };
}