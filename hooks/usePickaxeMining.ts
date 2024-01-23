import { usePickAxeChipOff, pickAxeABI } from './generated';
import { decodeEventLog } from 'viem'
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { StatusType } from './useBuyBox';

export function usePickaxeMining(pickaxeId: number | undefined) {
  const router = useRouter()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const [ gemId, setGemId ] = useState<number | undefined>(undefined)
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
      console.log('error 4')
      setStatus('error');
      toast.error(message)
    }
  })

  const pickaxeMiningResult = useWaitForTransaction({ hash: pickaxeMining?.data?.hash });
  
  useEffect(() => {
    if (pickaxeMining?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (pickaxeMining?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (pickaxeMining?.status === 'error') {
      console.log('error 0')
      setStatus('error');
      router.push(router.pathname + `?buy=error`)
      return;
    };
  }, [pickaxeMining?.status]);

  useEffect(() => {
    if (!pickaxeMiningResult.isError) return;
    console.log('error 1')
    setStatus('error');
  }, [pickaxeMiningResult.isError]);
  
  useEffect(() => {
    if (!pickaxeMiningResult.isSuccess) return;
    if (pickaxeMiningResult.data?.logs.length && pickaxeMiningResult.data?.logs.length < 2) {
      console.log('error 5')
      setStatus('error');
      return;
    }
    pickaxeMiningResult.data?.logs.forEach(log => {
      if (log.address.toLowerCase() !== process.env.NEXT_PUBLIC_CONTRACT_GEMS!.toLowerCase()) return;
      try {
        console.log(log)
        const decoded = decodeEventLog({
          abi: pickAxeABI,
          topics: log.topics,
          strict: false
        })
  
        console.log(decoded.args)
        let { tokenId } = decoded.args as { tokenId: number; }
        if (tokenId == undefined) {
          console.log('error 2')
          setStatus('error');
          return;
        }
        tokenId = Number(tokenId);
        setGemId(tokenId)
        console.log('success 1', tokenId)
        setStatus('success');
        router.push(router.pathname + `?mining=success`);
        return;
      } catch (error) {
        let message = (error as Error).message;
        console.log('error 3')
        setStatus('error');
        console.log(error)
        toast.error(message)
      }
    })
  }, [pickaxeMiningResult.isSuccess])

  useEffect(() => {
    console.log('ttt', status)
  }, [status]);

  return {
    estimateGas: estimateGas,
    pickaxeMining: pickaxeMining?.write || (() => {}),
    pickaxeMiningStatus: status,
    gemId,
  };
}