import { useEffect } from 'react';
import { useLemonBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from 'hooks/useContract';


export function useLemonBalance() {
  console.log('render useLemonBalance')
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const { address }  = useAccount();

  const balance = address && useLemonBalanceOf({
    address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
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