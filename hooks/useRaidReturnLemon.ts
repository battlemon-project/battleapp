import { useRaidsReturnLemon, raidsABI } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { useContract } from "hooks/useContract";

export function useRaidReturnLemon(raidId: bigint | undefined) {
  console.log('render useRaidReturnLemon')
  const NEXT_PUBLIC_CONTRACT_RAIDS = useContract('RAIDS')

  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()
   
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_RAIDS as '0x',
      abi: raidsABI,
      functionName: 'returnLemon',
      account: address as '0x',
      args: [raidId || BigInt(0)]
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const returnLemonRaid = address && useRaidsReturnLemon({
    address: NEXT_PUBLIC_CONTRACT_RAIDS as '0x',
    args: [raidId || BigInt(0)],
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

  const returnLemonRaidResult = useWaitForTransaction({ hash: returnLemonRaid?.data?.hash });
  
  useEffect(() => {
    if (returnLemonRaid?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (returnLemonRaid?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (returnLemonRaid?.status === 'error') {
      console.log('error 0')
      setStatus('error');
      return;
    };
  }, [returnLemonRaid?.status]);

  useEffect(() => {
    if (!returnLemonRaidResult.isError) return;
    console.log('error 1')
    setStatus('error');
  }, [returnLemonRaidResult.isError]);
  
  useEffect(() => {
    if (!returnLemonRaidResult.isSuccess) return;
    setStatus('success')
  }, [returnLemonRaidResult.isSuccess])

  return {
    estimateGas: estimateGas,
    returnLemonRaid: returnLemonRaid?.write || (() => {}),
    returnLemonRaidStatus: status
  };
}