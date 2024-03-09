import { useItemLevelUpFree, itemABI } from './generated';
import { useEffect, useState } from 'react';
import { useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { useContract } from './useContract';

export function useItemLevelup(address: `0x${string}`, itemId: number, gemId: number) {
  console.log('render useItemLevelup')
  const NEXT_PUBLIC_CONTRACT_ITEMS = useContract('ITEMS')
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const fee = useFeeData()

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
      abi: itemABI,
      functionName: 'levelUpFree',
      account: address as '0x',
      args: [BigInt(itemId), BigInt(gemId)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const itemLevelup = address && useItemLevelUpFree({
    address: NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
    args: [BigInt(itemId), BigInt(gemId)],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const itemLevelupResult = useWaitForTransaction({ hash: itemLevelup?.data?.hash });
  
  useEffect(() => {
    if (itemLevelup?.status === 'success') {
      setStatus('process')
    }    
    if (itemLevelup?.status === 'loading') {
      setStatus('loading');
    };
    if (itemLevelup?.status === 'error') {
      setStatus('error');
    };
  }, [itemLevelup?.status])

 
  useEffect(() => {
    if (!itemLevelupResult.isSuccess) return;
    if (itemLevelupResult.data?.logs.length) {
      const logLength = itemLevelupResult.data?.logs.filter(log => log.address.toLowerCase() == NEXT_PUBLIC_CONTRACT_ITEMS!.toLowerCase()).length
      console.log('logLength', logLength)
      if (logLength > 1) {
        setStatus('success');
        return
      } else {
        setStatus('error');
        return
      }
    }
    setStatus('error');
  }, [itemLevelupResult.isSuccess])


  useEffect(() => {
    if (!itemLevelupResult.isError) return
    setStatus('error');
    toast.error(itemLevelupResult.error?.message)
  }, [itemLevelupResult.isError])

  return {
    estimateGas: estimateGas,
    itemLevelup: itemLevelup?.write || (() => {}),
    itemLevelupStatus: status
  };
}