
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

export function useItemPrice() {
  console.log('render useItemPrice');
  const { chain } = useNetwork()
  const [ price, setPrice ] = useState<bigint>(BigInt(process.env.NEXT_PUBLIC_PRICE_POLYGON_ITEMS!))
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrice(BigInt(process.env.NEXT_PUBLIC_PRICE_POLYGON_ITEMS!))
    }
    
    if (chain.name.includes('Linea')) {
      setPrice(BigInt(process.env.NEXT_PUBLIC_PRICE_LINEA_ITEMS!))
    }

  }, [chain?.name])

  return price;
}