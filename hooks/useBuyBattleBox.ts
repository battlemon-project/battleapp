import { useBoxBuyBattleBox, boxABI } from './generated';
import { useEffect, useState } from 'react';
import { useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useContract } from './useContract';
import { parsePrice } from 'utils/misc';
import type { StatusType } from './useBuyBox';
import useAuth from 'context/AuthContext';
import { useBattleBoxPrice } from './useBattleBoxPrice';

export function useBuyBattleBox(contract: `0x${string}`, tokenId: number, isKey: boolean) {
  const publicClient = usePublicClient();
  const price = useBattleBoxPrice();
  const [ status, setStatus ] = useState<StatusType>('idle');
  const { address }  = useAuth();
  const fee = useFeeData();

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: contract,
      abi: boxABI,
      functionName: 'buyBattleBox',
      value: parsePrice(price),
      account: address as '0x',
      args: [BigInt(tokenId), isKey],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const buyBattleBox = address && useBoxBuyBattleBox({
    address: contract,
    value: parsePrice(price),
    args: [BigInt(tokenId), isKey],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const buyBattleBoxResult = useWaitForTransaction({ hash: buyBattleBox?.data?.hash });
  
  useEffect(() => {
    if (buyBattleBox?.status === 'success') {
      setStatus('process')
    }    
    if (buyBattleBox?.status === 'loading') {
      setStatus('loading');
    };
    if (buyBattleBox?.status === 'error') {
      setStatus('error');
    };
  }, [buyBattleBox?.status])

  
  useEffect(() => {
    if (!buyBattleBoxResult.isSuccess) return;
    setStatus('success')
  }, [buyBattleBoxResult.isSuccess])

  return {
    estimateGas: estimateGas,
    buyBattleBox: buyBattleBox?.write || (() => {}),
    buyBattleBoxStatus: status
  };
}