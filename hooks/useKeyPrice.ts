
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

export function useKeyPrice() {
  const { chain } = useNetwork()
  const [ price, setPrice ] = useState<string>(process.env.NEXT_PUBLIC_PRICE_POLYGON_KEY!)
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrice(process.env.NEXT_PUBLIC_PRICE_POLYGON_KEY!)
    }
    
    if (chain.name.includes('Linea')) {
      setPrice(process.env.NEXT_PUBLIC_PRICE_LINEA_KEY!)
    }

  }, [chain?.name])

  return price;
}