import { useEffect } from 'react';
import { useGoldenKeyBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from './useContract';

export function useGoldenKeyBalance() {
  const contract = useContract('KEY')
  const { address }  = useAccount();
  
  const balance = useGoldenKeyBalanceOf( address && contract ? {
    address: contract,
    args: [address],
    onError: (error) => {
      console.log(error ? 'balance error when switch' : undefined)
    }
  } : undefined)

  const refreshBalance = () => {
    if (address && contract) {
      balance?.refetch()
    }
  }

  useEffect(() => {
    window.addEventListener("focus", refreshBalance);
    return () => {
      window.removeEventListener("focus", refreshBalance);
    };
  }, []);
  
  return {
    balance: Number(balance?.data),
    refreshBalance
  };
}