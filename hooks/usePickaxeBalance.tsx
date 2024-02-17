import { useEffect } from 'react';
import { usePickAxeBalanceOf } from './generated';
import { useAccount } from 'wagmi';

export function usePickaxeBalance() {
  console.log('render usePickaxeBalance')
  const { address }  = useAccount();

  const balance = address && usePickAxeBalanceOf({
    address: process.env.NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
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