import { useEffect } from 'react';
import { useGoldenKeyGetAllKeys } from './generated';
import { useContract } from './useContract';

export function useGoldenKeyGetAll(address: `0x${string}`) {
  const contract = useContract('KEY')
  
  const allKeys = useGoldenKeyGetAllKeys(contract ? {
    address: contract,
    args: [address],
    onError: (error) => {
      console.log(error ? 'balance error when switch' : undefined)
    }
  } : undefined)

  const refreshAllKeys = () => {
    if (contract) {
      allKeys?.refetch()
    }
  }

  useEffect(() => {
    window.addEventListener("focus", refreshAllKeys);
    return () => {
      window.removeEventListener("focus", refreshAllKeys);
    };
  }, []);
  
  return {
    allKeys: (allKeys?.data ? allKeys.data[1].map(({ nextPointsTimestamp, nextBoxTimestamp }, index) => {
      const id = allKeys.data ? Number(allKeys.data[0][index]) : -1;
      return ({ id, nextPointsTimestamp: Number(nextPointsTimestamp), nextBoxTimestamp: Number(nextBoxTimestamp) })
    }) : []) as {
      id: number;
      nextPointsTimestamp: number;
      nextBoxTimestamp: number;
    }[],
    refreshAllKeys
  };
}