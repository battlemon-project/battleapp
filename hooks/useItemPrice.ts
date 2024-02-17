
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

export function useItemPrice() {
  const { chain } = useNetwork()
  const [ price, setPrice ] = useState<bigint>(BigInt(process.env.NEXT_PUBLIC_MINT_POLYGON_ITEMS_PRICE!))
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrice(BigInt(process.env.NEXT_PUBLIC_MINT_POLYGON_ITEMS_PRICE!))
    }
    
    if (chain.name.includes('Linea')) {
      setPrice(BigInt(process.env.NEXT_PUBLIC_MINT_LINEA_ITEMS_PRICE!))
    }

  }, [chain?.name])

  return price;
}