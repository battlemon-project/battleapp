import { useEffect } from 'react';
import { usePointBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from './useContract';

export function usePointsBalance() {
  console.log('enter usePointsBalance')
  const NEXT_PUBLIC_CONTRACT_POINTS = useContract('POINTS')
  const { address }  = useAccount();
  const balance = address && usePointBalanceOf({
    address: NEXT_PUBLIC_CONTRACT_POINTS as '0x',
    args: [address]
  })

  const onFocus = () => {
    balance?.refetch()
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  
  return {
    balance: Number(balance?.data),
    refreshBalance: balance?.refetch
  };
}