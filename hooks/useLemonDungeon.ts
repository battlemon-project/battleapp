import { useRaidsSendToRaid, raidsABI } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { useContract } from "hooks/useContract";
import { useRaidPrices } from './useRaidPrices';
import { parsePrice } from 'utils/misc';

export function useLemonDungeon(lemonId: number | undefined, level: number) {
  console.log('render useLemonDungeon')
  const raidPrices = useRaidPrices();
  const NEXT_PUBLIC_CONTRACT_RAIDS = useContract('RAIDS')
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()
   
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_RAIDS as '0x',
      abi: raidsABI,
      functionName: 'sendToRaid',
      account: address as '0x',
      args: [BigInt(lemonId || 0), level],
      value: parsePrice(raidPrices[level])
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const lemonRaid = address && useRaidsSendToRaid({
    address: NEXT_PUBLIC_CONTRACT_RAIDS as '0x',
    args: [BigInt(lemonId || 0), 0],
    value: parsePrice(raidPrices[level]),
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

  const lemonRaidResult = useWaitForTransaction({ hash: lemonRaid?.data?.hash });
  
  useEffect(() => {
    if (lemonRaid?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (lemonRaid?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (lemonRaid?.status === 'error') {
      console.log('error 0')
      setStatus('error');
      return;
    };
  }, [lemonRaid?.status]);

  useEffect(() => {
    if (!lemonRaidResult.isError) return;
    console.log('error 1')
    setStatus('error');
  }, [lemonRaidResult.isError]);
  
  useEffect(() => {
    if (!lemonRaidResult.isSuccess) return;
    setStatus('success')
  }, [lemonRaidResult.isSuccess])

  return {
    estimateGas: estimateGas,
    lemonRaid: lemonRaid?.write || (() => {}),
    lemonRaidStatus: status
  };
}