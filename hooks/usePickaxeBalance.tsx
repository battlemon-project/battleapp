import { useEffect } from 'react';
import { usePickAxeBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from "hooks/useContract";

export function usePickaxeBalance() {
  console.log('render usePickaxeBalance')
  const NEXT_PUBLIC_CONTRACT_PICKAXES = useContract('PICKAXES')
  const { address }  = useAccount();

  const balance = address && usePickAxeBalanceOf({
    address: NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
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