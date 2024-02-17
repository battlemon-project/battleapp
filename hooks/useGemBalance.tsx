import { useEffect } from 'react';
import { useGemBalanceOf } from './generated';
import { useAccount } from 'wagmi';

export function useGemBalance() {
  console.log('render useGemBalance')
  const { address }  = useAccount();

  const balance = address && useGemBalanceOf({
    address: process.env.NEXT_PUBLIC_CONTRACT_GEMS as '0x',
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