import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useWaitForTransaction } from 'wagmi';
import { useContract } from 'hooks/useContract';
import { useItemLzSend } from './generated';
import { StatusType } from './useBuyBox';
import { useLayerZeroQuoteItem, type BridgeItemProps } from './useLayerZeroQuoteItem';
import { chainToLayerZero } from './useLayerZeroQuoteLemon';

export function useLayerZeroBridgeItem({ tokenId, dataArray, chainId }: BridgeItemProps & { tokenId: number }) {
  const NEXT_PUBLIC_CONTRACT_ITEMS = useContract('ITEMS')
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { quote, options } = useLayerZeroQuoteItem({ chainId, dataArray });

  const itemBridge = useItemLzSend({
    address: NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
    args: [chainToLayerZero[chainId], BigInt(tokenId), options],
    value: quote ? quote?.nativeFee : BigInt(0),
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
    itemBridgeStatus: status
  };
}