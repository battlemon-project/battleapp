import { usePickAxeChipOff, pickAxeABI } from './generated';
import { decodeEventLog, parseAbi, toHex } from 'viem'
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { StatusType } from './useBuyBox';

export function usePickaxeMining(pickaxeId: number | undefined) {
  const router = useRouter()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const [ gemType, setGemType ] = useState<number>(0)
  const { address }  = useAccount();
  const fee = useFeeData()
   
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: process.env.NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
      abi: pickAxeABI,
      functionName: 'chipOff',
      account: address as '0x',
      args: [BigInt(pickaxeId || 0)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas,
      gasPrice
    }
  }

  const pickaxeMining = address && usePickAxeChipOff({
    address: process.env.NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
    args: [BigInt(pickaxeId || 0)],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const pickaxeMiningResult = useWaitForTransaction({ hash: pickaxeMining?.data?.hash });
  
  useEffect(() => {
    if (pickaxeMining?.status === 'success') {
      setStatus('process')
    }    
    if (pickaxeMining?.status === 'loading') {
      setStatus('loading');
    };
    if (pickaxeMining?.status === 'error') {
      setStatus('error');
      router.push(router.pathname + `?buy=error`)
    };
  }, [pickaxeMining?.status])

  
  useEffect(() => {
    if (!pickaxeMiningResult.isSuccess) return;

    // pickaxeMiningResult.data?.logs.forEach(log => {
    //   if (log.address.toLowerCase() !== process.env.NEXT_PUBLIC_CONTRACT_BOXES!.toLowerCase()) return;
    //   console.log(log)
    //   try {
    //     const decoded = decodeEventLog({
    //       abi: parseAbi(['event Prize(address, uint256)']),
    //       data: log.data,
    //       topics: log.topics
    //     })
  
    //     const [address, _prize] = decoded.args
    //     const prize = Number(_prize);
    //     console.log(prize)
    //     console.log(prizes[prize])
    //     setPrize(prizes[prize])
    //   } catch (error) {
    //     let message = (error as Error).message;
    //     console.log(error)
    //     toast.error(message)
    //   }
    // })

    setStatus('success')
    router.push(router.pathname + `?mining=success`)
  }, [pickaxeMiningResult.isSuccess])

  return {
    estimateGas: estimateGas,
    pickaxeMining: pickaxeMining?.write || (() => {}),
    pickaxeMiningStatus: status,
    gemType,
  };
}