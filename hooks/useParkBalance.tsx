import { useEffect } from 'react';
import { useLineaParkBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from './useContract';

export function useParkBalance() {
  console.log('render useParkBalance')
  const NEXT_PUBLIC_CONTRACT_PARK = useContract('PARK')
  const { address }  = useAccount();

  const balance = address && useLineaParkBalanceOf({
    address: NEXT_PUBLIC_CONTRACT_PARK as '0x',
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