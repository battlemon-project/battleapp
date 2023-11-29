import { useLemonBalanceOf } from './generated';
import { useAccount } from 'wagmi';


export function useItemsBalance() {
  const { address }  = useAccount();

  const balance = address && useLemonBalanceOf({
    address: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    args: [address]
  })

  return {
    balance: Number(balance?.data),
    refreshBalance: balance?.refetch
  };
}