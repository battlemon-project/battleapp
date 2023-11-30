import { useLemonChangeEquipmentBatch } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';

export function useLemonEquipment(lemonId: number, items: number[]) {
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  
  if (items.length < 9) {
    items.push(-2)
  }  
  if (items.length < 10) {
    items.push(-2)
  }

  const changeEquipment = address && useLemonChangeEquipmentBatch({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [
      BigInt(lemonId),
      items.map(i => BigInt(i))
    ]
  })

  const changeEquipmentResult = useWaitForTransaction({ hash: changeEquipment?.data?.hash });
  
  useEffect(() => {
    if (changeEquipment?.status === 'loading' || changeEquipment?.status === 'success') {
      setStatus('loading')
    };
    if (changeEquipment?.status === 'error') {
      setStatus('error')
    };
  }, [changeEquipment?.status])

  useEffect(() => {
    if (!changeEquipmentResult.isSuccess) return;
    setStatus('success')
  }, [changeEquipmentResult])

  return {
    changeEquipment: changeEquipment?.write || (() => {}),
    changeEquipmentStatus: status
  };
}