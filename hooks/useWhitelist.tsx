import { useEffect } from 'react';
import { useLemonWhitelist, useLemonPublicMintOpenTime } from './generated';
import { useAccount } from 'wagmi';

export function useWhitelist() {
  const { address }  = useAccount();

  const whitelist = address && useLemonWhitelist({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [address]
  })
  
  const openTime = address && useLemonPublicMintOpenTime({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x'
  })

  const onFocus = () => {
    whitelist?.refetch()
    openTime?.refetch()
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return {
    openTime: Number(openTime?.data),
    whitelist: whitelist?.data,
    refreshWhitelist: whitelist?.refetch
  };
}