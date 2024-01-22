


import { useGemMerge as generatedUseGemMerge, gemABI } from './generated';
import { decodeEventLog } from 'viem'
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
      args: [BigInt(gem0 || 0), BigInt(gem1 || 1)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas,
      gasPrice
    }
  }

  const gemMerge = address && generatedUseGemMerge({
    address: process.env.NEXT_PUBLIC_CONTRACT_GEMS as '0x',
    args: [BigInt(gem0 || 0), BigInt(gem1 || 1)],
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
      router.push(router.pathname + `?buy=error`)
    };
  }, [gemMerge?.status])

  
  useEffect(() => {
    if (!gemMergeResult.isSuccess) return;

    gemMergeResult.data?.logs.forEach(log => {
      if (log.address.toLowerCase() !== process.env.NEXT_PUBLIC_CONTRACT_GEMS!.toLowerCase()) return;
      try {
        console.log(log)
        const decoded = decodeEventLog({
          abi: gemABI,
          topics: log.topics,
          strict: false
        })
  
        console.log(decoded.args)
        let { tokenId } = decoded.args as { tokenId: number; }
        tokenId = Number(tokenId);
        console.log('new gem id', tokenId)
      } catch (error) {
        let message = (error as Error).message;
        console.log(error)
        toast.error(message)
      }
    })

    setStatus('success')
    router.push(router.pathname + `?mining=success`)
  }, [gemMergeResult.isSuccess])

  const getGemRank = async (tokenId: number): Promise<number> => {
    const metaURI = (await publicClient.readContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_GEMS as '0x',
      abi: gemABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    })) as string;
    const rank = parseInt(metaURI.split('/').at(-1) as string);
    return rank;
  };

  return {
    estimateGas: estimateGas,
    gemMerge: gemMerge?.write || (() => {}),
    gemMergeStatus: status,
    getGemRank,
  };
}