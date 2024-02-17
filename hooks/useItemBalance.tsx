import { useEffect } from 'react';
import { useItemBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from './useContract';

export function useItemBalance() {
  console.log('render useItemBalance')
  const NEXT_PUBLIC_CONTRACT_ITEMS = useContract('ITEMS')
  const { address }  = useAccount();
  
  const balance = useItemBalanceOf( address && NEXT_PUBLIC_CONTRACT_ITEMS ? {
    address: NEXT_PUBLIC_CONTRACT_ITEMS,
    args: [address],
    onError: (error) => {
      console.log(error ? 'balance error when switch' : undefined)
    }
  } : undefined)

  const refreshBalance = () => {
    if (address && NEXT_PUBLIC_CONTRACT_ITEMS) {
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