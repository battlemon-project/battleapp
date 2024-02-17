
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

export function useLemonPrice() {
  console.log('render useLemonPrice')
  const { chain } = useNetwork()
  const [ price, setPrice ] = useState<string>(process.env.NEXT_PUBLIC_MINT_POLYGON_LEMONS_PRICE!)
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrice(process.env.NEXT_PUBLIC_MINT_POLYGON_LEMONS_PRICE!)
    }
    
    if (chain.name.includes('Linea')) {
      setPrice(process.env.NEXT_PUBLIC_MINT_LINEA_LEMONS_PRICE!)
    }

  }, [chain?.name])

  return price;
}