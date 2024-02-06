import { usePickAxeSharp, pickAxeABI } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { StatusType } from './useBuyBox';
import { parseEther } from 'viem';

const CHEAP_PICK_AXE_SHARP_PRICE = parseEther("0.001");
const GOOD_PICK_AXE_SHARP_PRICE = parseEther("0.00022");
const GREAT_PICK_AXE_SHARP_PRICE = parseEther("0.0001");

const repairPrices: {[key: number]: bigint} = {
  0: CHEAP_PICK_AXE_SHARP_PRICE,
  1: GOOD_PICK_AXE_SHARP_PRICE,
  2: GREAT_PICK_AXE_SHARP_PRICE,
}

export function usePickaxeRepair(pickaxeId: number | undefined, pickaxeType: number) {
  const router = useRouter()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()
   
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: process.env.NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
      abi: pickAxeABI,
      functionName: 'sharp',
      value: repairPrices[pickaxeType],
      account: address as '0x',
      args: [BigInt(pickaxeId || 0)],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(5) : undefined
    return {
      gas,
      gasPrice
    }
  }

  const pickaxeRepair = address && usePickAxeSharp({
    address: process.env.NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
    value: repairPrices[pickaxeType],
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
      router.push(router.pathname + `?buy=error`)
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