import { useGoldenKeySafeMint, goldenKeyABI } from './generated';
import { useEffect, useState } from 'react';
import { useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { parsePrice } from 'utils/misc';
import { useKeyPrice } from './useKeyPrice';

export function useGoldenKeyMint(address: `0x${string}`, contract: `0x${string}`, count: number, price: string) {
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const fee = useFeeData()
  const batchPrice = parsePrice(price) * BigInt(count || 1);

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: contract,
      abi: goldenKeyABI,
      functionName: 'safeMint',
      value: batchPrice,
      account: address,
      args: [BigInt(count || 1)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const goldenKeyMint = useGoldenKeySafeMint({
    address: contract,
    value: batchPrice,
    args: [BigInt(count || 1)],
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

  const goldenKeyMintResult = useWaitForTransaction({ hash: goldenKeyMint?.data?.hash });
  
  useEffect(() => {
    if (goldenKeyMint?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (goldenKeyMint?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (goldenKeyMint?.status === 'error') {
      setStatus('error');
      return;
    };
  }, [goldenKeyMint?.status]);

  useEffect(() => {
    if (!goldenKeyMintResult.isError) return;
    setStatus('error');
  }, [goldenKeyMintResult.isError]);
  
  useEffect(() => {
    if (!goldenKeyMintResult.isSuccess) return;
    setStatus('success');
  }, [goldenKeyMintResult.isSuccess])

  return {
    estimateGas: estimateGas,
    goldenKeyMint: goldenKeyMint?.write || (() => {}),
    goldenKeyMintStatus: status
  };
}
