import { useLemonMint as generatedUseLemonMint, lemonABI } from './generated';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useWaitForTransaction, usePublicClient, useFeeData } from 'wagmi';
import { toast } from 'react-toastify';
import { useContract } from 'hooks/useContract';
import { useLemonPrice } from './useLemonPrice';

export function useLemonMint(count: number) {
  console.log('render useLemonMint')
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const NEXT_PUBLIC_MINT_LEMONS_PRICE = useLemonPrice()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()

  const batchPrice = (Number(NEXT_PUBLIC_MINT_LEMONS_PRICE) * (count || 1)).toFixed(10).replace(/\.?0+$/,"")

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
      abi: lemonABI,
      functionName: 'mint',
      value: BigInt(batchPrice),
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
    address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [count || 1],
    value: BigInt(batchPrice),
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
    };
  }, [lemonMint?.status])

  useEffect(() => {
    if (!lemonMintResult.isSuccess) return;
    setStatus('success')
  }, [lemonMintResult])

  return {
    estimateGas: estimateGas,
    lemonMint: lemonMint?.write || (() => {}),
    lemonMintStatus: status
  };
}