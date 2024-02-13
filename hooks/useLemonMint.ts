import { useLemonMint as generatedUseLemonMint, lemonABI } from './generated';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useWaitForTransaction, usePublicClient, useFeeData } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export function useLemonMint(count: number) {
  const router = useRouter()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()

  const batchPrice = (Number(process.env.NEXT_PUBLIC_MINT_LEMONS_PRICE) * (count || 1)).toFixed(10).replace(/\.?0+$/,"")

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
      abi: lemonABI,
      functionName: 'mint',
      value: parseEther(batchPrice),
      args: [count || 1],
      account: address as '0x',
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const lemonMint = address && generatedUseLemonMint({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [count || 1],
    value: parseEther(batchPrice),
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const lemonMintResult = useWaitForTransaction({ hash: lemonMint?.data?.hash });
  
  useEffect(() => {
    if (lemonMint?.status === 'loading' || lemonMint?.status === 'success') {
      setStatus('loading')
    };
    if (lemonMint?.status === 'error') {
      setStatus('error')
      router.push(router.pathname + `?buy=error`)
    };
  }, [lemonMint?.status])

  useEffect(() => {
    if (!lemonMintResult.isSuccess) return;
    setStatus('success')
    router.push(router.pathname + `?buy=success`)
  }, [lemonMintResult])

  return {
    estimateGas: estimateGas,
    lemonMint: lemonMint?.write || (() => {}),
    lemonMintStatus: status
  };
}