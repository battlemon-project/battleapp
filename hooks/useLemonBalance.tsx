import { useEffect } from 'react';
import { useLemonBalanceOf } from './generated';
import { useAccount } from 'wagmi';


export function useLemonBalance() {
  console.log('render useLemonBalance')
  const { address }  = useAccount();

  const balance = address && useLemonBalanceOf({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
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