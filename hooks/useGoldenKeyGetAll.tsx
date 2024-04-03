import { useEffect } from 'react';
import { useGoldenKeyGetAllKeys } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from './useContract';

export function useGoldenKeyGetAll() {
  const contract = useContract('KEY')
  const { address }  = useAccount();
  
  const allKeys = useGoldenKeyGetAllKeys( address && contract ? {
    address: contract,
    args: [address],
    onError: (error) => {
      console.log(error ? 'balance error when switch' : undefined)
    }
  } : undefined)

  const refreshAllKeys = () => {
    if (address && contract) {
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
    allKeys: allKeys?.data,
    refreshAllKeys
  };
}