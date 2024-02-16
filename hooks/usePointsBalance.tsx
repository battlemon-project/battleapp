import { useEffect } from 'react';
import { usePointBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from './useContract';

export function usePointsBalance() {
  const NEXT_PUBLIC_CONTRACT_POINTS = useContract('POINTS')
  const { address }  = useAccount();
  console.log('address POINTS', NEXT_PUBLIC_CONTRACT_POINTS)
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