import { useStickerCraftItem, stickerABI } from './generated';
import { useEffect, useState } from 'react';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { useContract } from './useContract';

export function useStickerMerge(sticker0: number, sticker1: number, sticker2: number, sticker3: number) {
  console.log('render useStickerMerge')
  const NEXT_PUBLIC_CONTRACT_STICKERS = useContract('STICKERS')
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()
   
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_STICKERS as '0x',
      abi: stickerABI,
      functionName: 'craftItem',
      account: address as '0x',
      args: [[BigInt(sticker0), BigInt(sticker1), BigInt(sticker2), BigInt(sticker3)]],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const stickerMerge = address && useStickerCraftItem({
    address: NEXT_PUBLIC_CONTRACT_STICKERS as '0x',
    args: [[BigInt(sticker0), BigInt(sticker1), BigInt(sticker2), BigInt(sticker3)]],
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

  const stickerMergeResult = useWaitForTransaction({ hash: stickerMerge?.data?.hash });
  
  useEffect(() => {
    if (stickerMerge?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (stickerMerge?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (stickerMerge?.status === 'error') {
      setStatus('error');
      return;
    };
  }, [stickerMerge?.status]);

  useEffect(() => {
    if (!stickerMergeResult.isError) return;
    setStatus('error');
  }, [stickerMergeResult.isError]);
  
  useEffect(() => {
    if (!stickerMergeResult.isSuccess) return;
    setStatus('success');
  }, [stickerMergeResult.isSuccess])

  return {
    estimateGas: estimateGas,
    stickerMerge: stickerMerge?.write || (() => {}),
    stickerMergeStatus: status
  };
}