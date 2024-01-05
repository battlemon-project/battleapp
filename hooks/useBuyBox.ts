import { useBoxBuyCheapBox, useBoxBuyGoodBox, useBoxBuyGreatBox, boxABI } from './generated';
import { decodeEventLog, toHex } from 'viem'
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export enum BoxType {
  Cheap = 'Cheap',
  Good = 'Good',
  Great = 'Great'
}

export const boxPrices = {
  Cheap: process.env.NEXT_PUBLIC_MINT_CHEAP_BOX_PRICE!,
  Good: process.env.NEXT_PUBLIC_MINT_GOOD_BOX_PRICE!,
  Great: process.env.NEXT_PUBLIC_MINT_GREAT_BOX_PRICE!
}

export function useBuyBox(type: BoxType) {
  const router = useRouter()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<'error' | 'success' | 'loading' | 'idle'>('idle')
  const { address }  = useAccount();
  const fee = useFeeData()
   
  const funcNames: {[key: string]: 'buyCheapBox' | 'buyGoodBox' | 'buyGreatBox'} = {
    Cheap: 'buyCheapBox',
    Good: 'buyGoodBox',
    Great: 'buyGreatBox'
  }

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: process.env.NEXT_PUBLIC_CONTRACT_BOXES as '0x',
      abi: boxABI,
      functionName: funcNames[type],
      value: parseEther(boxPrices[type]),
      account: address as '0x',
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas,
      gasPrice
    }
  }

  const methodsNames = {
    Cheap: useBoxBuyCheapBox,
    Good: useBoxBuyGoodBox,
    Great: useBoxBuyGreatBox
  }

  const buyBox = address && methodsNames[type]({
    address: process.env.NEXT_PUBLIC_CONTRACT_BOXES as '0x',
    value: parseEther(boxPrices[type]),
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const buyBoxResult = useWaitForTransaction({ hash: buyBox?.data?.hash });
  
  useEffect(() => {
    if (buyBox?.status === 'loading' || buyBox?.status === 'success') {
      setStatus('loading');
    };
    if (buyBox?.status === 'error') {
      setStatus('error');
      router.push(router.pathname + `?buy=${type}_error`)
    };
  }, [buyBox?.status])

  useEffect(() => {
    if (!buyBoxResult.isSuccess) return;

    buyBoxResult.data?.logs.forEach(log => {
      if (log.topics[0] !== '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') return;
      console.log(log)
      try {
        const decoded = decodeEventLog({
          abi: boxABI,
          strict: false,
          data: log.data,
          topics: log.topics
        })
  
        console.log(decoded)
      } catch (e) {

      }
    })

    setStatus('success')
    router.push(router.pathname + `?buy=${type}_success`)
  }, [buyBoxResult.isSuccess])

  return {
    estimateGas: estimateGas,
    buyBox: buyBox?.write || (() => {}),
    buyBoxStatus: status
  };
}