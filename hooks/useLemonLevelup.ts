import { useLemonLevelUp, lemonABI } from './generated';
import { useEffect, useState } from 'react';
import { useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { useContract } from './useContract';

export function useLemonLevelup(address: `0x${string}` ,lemonId: number, gemId: number) {
  console.log('render useLemonLevelup')
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const fee = useFeeData()

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
      abi: lemonABI,
      functionName: 'levelUp',
      account: address as '0x',
      args: [BigInt(lemonId), BigInt(gemId)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const lemonLevelup = address && useLemonLevelUp({
    address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [BigInt(lemonId), BigInt(gemId)],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const lemonLevelupResult = useWaitForTransaction({ hash: lemonLevelup?.data?.hash });
  
  useEffect(() => {
    if (lemonLevelup?.status === 'success') {
      setStatus('process')
    }    
    if (lemonLevelup?.status === 'loading') {
      setStatus('loading');
    };
    if (lemonLevelup?.status === 'error') {
      setStatus('error');
    };
  }, [lemonLevelup?.status])

 
  useEffect(() => {
    if (!lemonLevelupResult.isSuccess) return;
    if (lemonLevelupResult.data?.logs.length) {
      const logLength = lemonLevelupResult.data?.logs.filter(log => log.address.toLowerCase() == NEXT_PUBLIC_CONTRACT_LEMONS!.toLowerCase()).length
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
  }, [lemonLevelupResult.isSuccess])


  useEffect(() => {
    if (!lemonLevelupResult.isError) return
    setStatus('error');
    toast.error(lemonLevelupResult.error?.message)
  }, [lemonLevelupResult.isError])

  return {
    estimateGas: estimateGas,
    lemonLevelup: lemonLevelup?.write || (() => {}),
    lemonLevelupStatus: status
  };
}