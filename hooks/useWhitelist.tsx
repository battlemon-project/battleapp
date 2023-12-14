import { useEffect } from 'react';
import { useLemonWhitelist } from './generated';
import { useAccount } from 'wagmi';

export function useWhitelist() {
  const { address }  = useAccount();

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  
  const whitelist = useLemonWhitelist({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [address as '0x']
  })


  const onFocus = () => {
    whitelist?.refetch()
  };


  return {
    whitelist: whitelist?.data,
    refreshWhitelist: whitelist?.refetch
  };
}