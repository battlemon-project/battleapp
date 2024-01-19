import { useBoxBuyCheapBox, useBoxBuyGoodBox, useBoxBuyGreatBox, boxABI } from './generated';
import { decodeEventLog, parseAbi, toHex } from 'viem'
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

export type StatusType = 'error' | 'success' | 'loading' | 'idle' | 'process'

export enum PrizeType {
  Sticker = 'Sticker',
  SmallMatic = 'Small Matic',
  MediumMatic = 'Medium Matic', 
  LargeMatic = 'Large Matic',
  SmallPoints = 'Small Points',
  MediumPoints = 'Medium Points',
  PointsLemon = 'Points for Lemon',
  PointsItem = 'Points for Item',
  Hoodie = 'Hoodie',
  Shirt = 'Shirt',
  Cap = 'Cap', 
  CheapPickaxe = 'Cheap Pickaxe',
  GoodPickaxe = 'Good Pickaxe',
  GreatPickaxe = 'Great Pickaxe',
  Item = 'Item',
  Lemon = 'Lemon'
}

export const boxPrices = {
  Cheap: process.env.NEXT_PUBLIC_MINT_CHEAP_BOX_PRICE!,
  Good: process.env.NEXT_PUBLIC_MINT_GOOD_BOX_PRICE!,
  Great: process.env.NEXT_PUBLIC_MINT_GREAT_BOX_PRICE!
}

export const prizes: {[key: number]: PrizeType} = {
  0: PrizeType.Sticker,
  100: PrizeType.SmallMatic,
  101: PrizeType.MediumMatic,
  102: PrizeType.LargeMatic,
  200: PrizeType.SmallPoints,
  201: PrizeType.MediumPoints,
  210: PrizeType.PointsLemon,
  211: PrizeType.PointsItem,
  300: PrizeType.Hoodie,
  301: PrizeType.Shirt,
  302: PrizeType.Cap,
  400: PrizeType.CheapPickaxe,
  401: PrizeType.GoodPickaxe,
  402: PrizeType.GreatPickaxe,
  500: PrizeType.Item,
  600: PrizeType.Lemon
}


export const prizesChance: {[key in BoxType]: { [key: number]: number }} = {
  [BoxType.Cheap]: {
    0: 30, // Sticker
    100: 35, // Small Matic
    101: 38, // Medium Matic
    102: 39, // Large Matic
    200: 59, // Small Points
    201: 69, // Medium Points
    300: 71, // Hoodie
    301: 73, // Shirt
    302: 75, // Cap
    400: 76, // Cheap Pickaxe
  },
  [BoxType.Good]: {
    0: 30, // Sticker
    100: 47, // Small Matic
    101: 53, // Medium Matic
    102: 56, // Large Matic
    200: 71, // Small Points
    201: 79, // Medium Points
    300: 81, // Hoodie
    301: 83, // Shirt
    302: 85, // Cap
    400: 95, // Cheap Pickaxe
    401: 96, // Good Pickaxe
    500: 38, // Item
    211: 38, // Points for Item
  },
  [BoxType.Great]: {
    100: 44, // Small Matic
    101: 52, // Medium Matic
    102: 58, // Large Matic
    200: 68, // Small Points
    201: 73, // Medium Points
    300: 77, // Hoodie
    301: 81, // Shirt
    302: 85, // Cap
    400: 90, // Cheap Pickaxe
    401: 95, // Good Pickaxe
    402: 96, // Great Pickaxe
    500: 32, // Item
    600: 20, // Lemon
    211: 32, // Points for Item
    210: 20, // Points for Lemon
  }
}

export function useBuyBox(type: BoxType, itemType: number) {
  const router = useRouter()
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const [ prize, setPrize ] = useState<PrizeType>()
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
      args: [BigInt(prizesChance[type][itemType] || -1)],
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
    args: [BigInt(prizesChance[type][itemType] || -1)],
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
    if (buyBox?.status === 'success') {
      setStatus('process')
    }    
    if (buyBox?.status === 'loading') {
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
      if (log.address.toLowerCase() !== process.env.NEXT_PUBLIC_CONTRACT_BOXES!.toLowerCase()) return;
      console.log(log)
      try {
        const decoded = decodeEventLog({
          abi: parseAbi(['event Prize(address, uint256)']),
          data: log.data,
          topics: log.topics
        })
  
        const [address, _prize] = decoded.args
        const prize = Number(_prize);
        console.log(prize)
        console.log(prizes[prize])
        setPrize(prizes[prize])
      } catch (error) {
        let message = (error as Error).message;
        console.log(error)
        toast.error(message)
      }
    })

    setStatus('success')
    router.push(router.pathname + `?buy=${type}_success`)
  }, [buyBoxResult.isSuccess])

  return {
    estimateGas: estimateGas,
    buyBox: buyBox?.write || (() => {}),
    buyBoxStatus: status,
    prize: prize
  };
}