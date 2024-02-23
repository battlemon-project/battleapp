import { useEffect } from 'react';
import { useStickerBalanceOf } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from './useContract';

export function useStickerBalance() {
  console.log('render useStickerBalance')
  const NEXT_PUBLIC_CONTRACT_STICKERS = useContract('STICKERS')
  const { address }  = useAccount();

  const balance = address && useStickerBalanceOf({
    address: NEXT_PUBLIC_CONTRACT_STICKERS as '0x',
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