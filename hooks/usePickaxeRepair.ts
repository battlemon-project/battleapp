import { usePickAxeSharp, pickAxeABI } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { useContract } from './useContract';
import { useSharpPrices } from './useSharpPrices';
import { parsePrice } from 'utils/misc';

export function usePickaxeRepair(pickaxeId: number | undefined, pickaxeType: number) {
  console.log('render usePickaxeRepair')
  const sharpPrices = useSharpPrices()
  const NEXT_PUBLIC_CONTRACT_PICKAXES = useContract('PICKAXES')
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()
   
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
      abi: pickAxeABI,
      functionName: 'sharp',
      value: parsePrice(sharpPrices[pickaxeType]),
      account: address as '0x',
      args: [BigInt(pickaxeId || 0)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const pickaxeRepair = address && usePickAxeSharp({
    address: NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
    value: parsePrice(sharpPrices[pickaxeType]),
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

  const pickaxeRepairResult = useWaitForTransaction({ hash: pickaxeRepair?.data?.hash });
  
  useEffect(() => {
    if (pickaxeRepair?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (pickaxeRepair?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (pickaxeRepair?.status === 'error') {
      setStatus('error');
      return;
    };
  }, [pickaxeRepair?.status]);

  useEffect(() => {
    if (!pickaxeRepairResult.isError) return;
    setStatus('error');
  }, [pickaxeRepairResult.isError]);
  
  useEffect(() => {
    if (!pickaxeRepairResult.isSuccess) return;
    setStatus('success');
  }, [pickaxeRepairResult.isSuccess])

  return {
    estimateGas: estimateGas,
    pickaxeRepair: pickaxeRepair?.write || (() => {}),
    pickaxeRepairStatus: status
  };
}