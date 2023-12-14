import { useItemMint as generatedUseItemMint, itemABI } from './generated';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';

export function useItemMint(count: number) {
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()
 
  const batchPrice = (Number(process.env.NEXT_PUBLIC_MINT_ITEMS_PRICE) * (count || 1)).toFixed(10).replace(/\.?0+$/,"")
  
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: process.env.NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
      abi: itemABI,
      functionName: 'mint',
      value: parseEther(batchPrice),
      args: [count || 1],
      account: address as '0x',
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas,
      gasPrice
    }
  }

  const itemMint = address && generatedUseItemMint({
    address: process.env.NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
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

  const itemMintResult = useWaitForTransaction({ hash: itemMint?.data?.hash });
  
  useEffect(() => {
    if (itemMint?.status === 'loading' || itemMint?.status === 'success') {
      setStatus('loading');
    };
    if (itemMint?.status === 'error') {
      setStatus('error');
    };
  }, [itemMint?.status])

  useEffect(() => {
    if (!itemMintResult.isSuccess) return;
    setStatus('success')
  }, [itemMintResult])

  return {
    estimateGas: estimateGas,
    itemMint: itemMint?.write || (() => {}),
    itemMintStatus: status
  };
}