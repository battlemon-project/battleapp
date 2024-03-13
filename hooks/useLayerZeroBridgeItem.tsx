import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { useContract } from 'hooks/useContract';
import { useItemLzSend, itemABI } from './generated';
import { StatusType } from './useBuyBox';
import { useLayerZeroQuoteItem, type BridgeItemProps } from './useLayerZeroQuoteItem';
import { chainToLayerZero } from 'utils/misc';

export function useLayerZeroBridgeItem({ tokenId, dataArray, chainId }: BridgeItemProps & { tokenId: number }) {
  const NEXT_PUBLIC_CONTRACT_ITEMS = useContract('ITEMS')
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { quote, options } = useLayerZeroQuoteItem({ chainId, dataArray });
  const args: [number, bigint, `0x${string}`] = [chainToLayerZero[chainId], BigInt(tokenId), options];
  const value = quote ? quote?.nativeFee : BigInt(0);
  const publicClient = usePublicClient()
  const fee = useFeeData()

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
      abi: itemABI,
      functionName: 'lzSend',
      account: NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
      args,
      value
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(1.1) : undefined
    return {
      gas: gas + BigInt(50000),
      gasPrice
    }
  }

  const itemBridge = useItemLzSend({
    address: NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
    args,
    value,
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      console.log('error 4')
      setStatus('error');
      toast.error(message)
    }
  });

  const itemBridgeResult = useWaitForTransaction({ hash: itemBridge?.data?.hash });
  
  useEffect(() => {
    if (itemBridge?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (itemBridge?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (itemBridge?.status === 'error') {
      console.log('error 0')
      setStatus('error');
      return;
    };
  }, [itemBridge?.status]);

  useEffect(() => {
    if (!itemBridgeResult.isError) return;
    console.log('error 1')
    setStatus('error');
  }, [itemBridgeResult.isError]);
  
  useEffect(() => {
    if (!itemBridgeResult.isSuccess) return;
    setStatus('success')
  }, [itemBridgeResult.isSuccess])

  return {
    itemBridge: itemBridge?.write || (() => {}),
    itemBridgeStatus: status,
    estimateGas
  };
}