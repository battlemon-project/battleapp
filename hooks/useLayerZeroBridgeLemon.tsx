import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { useContract } from 'hooks/useContract';
import { useLemonLzSend, lemonABI } from './generated';
import { StatusType } from './useBuyBox';
import { useLayerZeroQuoteLemon, type BridgeLemonProps } from './useLayerZeroQuoteLemon'
import { chainToLayerZero } from 'utils/misc';

export function useLayerZeroBridgeLemon({ tokenId, dataArray, chainId }: BridgeLemonProps & { tokenId: number }) {
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { quote, options } = useLayerZeroQuoteLemon({ chainId, dataArray });
  const args: [number, bigint, `0x${string}`] = [chainToLayerZero[chainId], BigInt(tokenId), options];
  const value = quote ? quote?.nativeFee : BigInt(0);
  const publicClient = usePublicClient()
  const fee = useFeeData()

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
      abi: lemonABI,
      functionName: 'lzSend',
      account: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
      args,
      value
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(1.1) : undefined
    return {
      gas: gas + BigInt(50000),
      gasPrice
    }
  }

  const lemonBridge = useLemonLzSend({
    address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
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

  const lemonBridgeResult = useWaitForTransaction({ hash: lemonBridge?.data?.hash });
  
  useEffect(() => {
    if (lemonBridge?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (lemonBridge?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (lemonBridge?.status === 'error') {
      console.log('error 0')
      setStatus('error');
      return;
    };
  }, [lemonBridge?.status]);

  useEffect(() => {
    if (!lemonBridgeResult.isError) return;
    console.log('error 1')
    setStatus('error');
  }, [lemonBridgeResult.isError]);
  
  useEffect(() => {
    if (!lemonBridgeResult.isSuccess) return;
    setStatus('success')
  }, [lemonBridgeResult.isSuccess])

  return {
    lemonBridge: lemonBridge?.write || (() => {}),
    lemonBridgeStatus: status,
    estimateGas
  };
}