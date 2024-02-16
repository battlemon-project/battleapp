


import { useGemMerge as generatedUseGemMerge, gemABI } from './generated';
import { decodeEventLog, parseEther } from 'viem'
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { StatusType } from './useBuyBox';

export function useGemMerge(gem0: number | undefined, gem1: number | undefined) {
  const router = useRouter()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: process.env.NEXT_PUBLIC_CONTRACT_GEMS as '0x',
      abi: gemABI,
      functionName: 'merge',
      account: address as '0x',
      args: [BigInt(gem0 || 0), BigInt(gem1 || 0)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const gemMerge = address && generatedUseGemMerge({
    address: process.env.NEXT_PUBLIC_CONTRACT_GEMS as '0x',
    args: [BigInt(gem0 || 0), BigInt(gem1 || 0)],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const gemMergeResult = useWaitForTransaction({ hash: gemMerge?.data?.hash });
  
  useEffect(() => {
    if (gemMerge?.status === 'success') {
      setStatus('process')
    }    
    if (gemMerge?.status === 'loading') {
      setStatus('loading');
    };
    if (gemMerge?.status === 'error') {
      setStatus('error');
      router.push(router.pathname + `?merge=error`)
    };
  }, [gemMerge?.status])

 
  useEffect(() => {
    if (!gemMergeResult.isSuccess) return;
    if (gemMergeResult.data?.logs.length) {
      const logLength = gemMergeResult.data?.logs.filter(log => log.address.toLowerCase() == process.env.NEXT_PUBLIC_CONTRACT_GEMS!.toLowerCase()).length
      console.log('logLength', logLength)
      if (logLength > 1) {
        setStatus('success');
        router.push(router.pathname + `?merge=success`)
        return
      } else {
        setStatus('error');
        router.push(router.pathname + `?merge=error`)
        return
      }
    }
    setStatus('error');
    router.push(router.pathname + `?merge=error`)
  }, [gemMergeResult.isSuccess])


  useEffect(() => {
    if (!gemMergeResult.isError) return
    setStatus('error');
    toast.error(gemMergeResult.error?.message)
  }, [gemMergeResult.isError])

  return {
    estimateGas: estimateGas,
    gemMerge: gemMerge?.write || (() => {}),
    gemMergeStatus: status
  };
}