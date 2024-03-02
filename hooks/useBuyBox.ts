import { useBoxBuyCheapBox, useBoxBuyGoodBox, useBoxBuyGreatBox, boxABI } from './generated';
import { decodeEventLog, parseAbi, toHex } from 'viem'
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useContract } from './useContract';
import { useBoxPrices } from './useBoxPrices';

export enum BoxType {
  Cheap = 'Cheap',
  Good = 'Good',
  Great = 'Great'
}

export type StatusType = 'error' | 'success' | 'loading' | 'idle' | 'process'

export enum PrizeType {
  Sticker = 'Sticker',
  SmallEthers = 'Small Ethers',
  MediumEthers = 'Medium Ethers', 
  LargeEthers = 'Large Ethers',
  SmallPoints = 'Small Points',
  MediumPoints = 'Medium Points',
  LargePoints = 'Large Points',
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

export const prizes: {[key: number]: PrizeType} = {
  0: PrizeType.Sticker,
  100: PrizeType.SmallEthers,
  101: PrizeType.MediumEthers,
  102: PrizeType.LargeEthers,
  200: PrizeType.SmallPoints,
  201: PrizeType.MediumPoints,
  202: PrizeType.LargePoints,
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

export function useBuyBox(type: BoxType) {
  console.log('render useBuyBox')
  const publicClient = usePublicClient()
  const NEXT_PUBLIC_CONTRACT_BOXES = useContract('BOXES')
  const boxPrices = useBoxPrices();
  const [ status, setStatus ] = useState<StatusType>('idle')
  const [ prize, setPrize ] = useState<PrizeType>()
  const { address }  = useAccount();
  const fee = useFeeData();
  const funcNames: {[key: string]: 'buyCheapBox' | 'buyGoodBox' | 'buyGreatBox'} = {
    Cheap: 'buyCheapBox',
    Good: 'buyGoodBox',
    Great: 'buyGreatBox'
  }

  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_BOXES as '0x',
      abi: boxABI,
      functionName: funcNames[type],
      value: parseEther(boxPrices[type]),
      account: address as '0x'
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const methodsNames = {
    Cheap: useBoxBuyCheapBox,
    Good: useBoxBuyGoodBox,
    Great: useBoxBuyGreatBox
  }

  const buyBox = address && methodsNames[type]({
    address: NEXT_PUBLIC_CONTRACT_BOXES as '0x',
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
    if (buyBox?.status === 'success') {
      setStatus('process')
    }    
    if (buyBox?.status === 'loading') {
      setStatus('loading');
    };
    if (buyBox?.status === 'error') {
      setStatus('error');
    };
  }, [buyBox?.status])

  
  useEffect(() => {
    if (!buyBoxResult.isSuccess) return;

    buyBoxResult.data?.logs.forEach(log => {
      return;
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
  }, [buyBoxResult.isSuccess])

  return {
    estimateGas: estimateGas,
    buyBox: buyBox?.write || (() => {}),
    buyBoxStatus: status,
    prize: prize
  };
}