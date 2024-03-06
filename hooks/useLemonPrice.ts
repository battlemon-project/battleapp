
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

export function useLemonPrice() {
  console.log('render useLemonPrice')
  const { chain } = useNetwork()
  const [ price, setPrice ] = useState<string>(process.env.NEXT_PUBLIC_PRICE_POLYGON_LEMONS!)
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrice(process.env.NEXT_PUBLIC_PRICE_POLYGON_LEMONS!)
    }
    
    if (chain.name.includes('Linea')) {
      setPrice(process.env.NEXT_PUBLIC_PRICE_LINEA_LEMONS!)
    }

  }, [chain?.name])

  return price;
}