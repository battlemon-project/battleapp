


import { useLineaParkSafeMint, lineaParkABI } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { StatusType } from './useBuyBox';
import { toast } from 'react-toastify';
import { useContract } from './useContract';

export function useLineaParkMint() {
  const NEXT_PUBLIC_CONTRACT_PARK = useContract('PARK')
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_PARK as '0x',
      abi: lineaParkABI,
      functionName: 'safeMint',
      account: address as '0x',
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const parkMint = address && useLineaParkSafeMint({
    address: NEXT_PUBLIC_CONTRACT_PARK as '0x',
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const parkMintResult = useWaitForTransaction({ hash: parkMint?.data?.hash });
  
  useEffect(() => {
    if (parkMint?.status === 'success') {
      setStatus('process')
    }    
    if (parkMint?.status === 'loading') {
      setStatus('loading');
    };
    if (parkMint?.status === 'error') {
      setStatus('error');
    };
  }, [parkMint?.status])

 
  useEffect(() => {
    if (!parkMintResult.isSuccess) return;
    setStatus('success');
  }, [parkMintResult.isSuccess])


  useEffect(() => {
    if (!parkMintResult.isError) return
    setStatus('error');
    toast.error(parkMintResult.error?.message)
  }, [parkMintResult.isError])

  return {
    estimateGas: estimateGas,
    parkMint: parkMint?.write || (() => {}),
    parkMintStatus: status
  };
}