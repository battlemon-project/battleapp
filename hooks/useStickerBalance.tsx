import { useEffect } from 'react';
import { useStickerBalanceOf } from './generated';
import { useAccount } from 'wagmi';

export function useStickerBalance() {
  const { address }  = useAccount();

  const balance = address && useStickerBalanceOf({
    address: process.env.NEXT_PUBLIC_CONTRACT_STICKERS as '0x',
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