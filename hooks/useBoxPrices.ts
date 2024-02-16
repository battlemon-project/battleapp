
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

interface PricesType {
  Cheap: string,
  Good: string,
  Great: string
}

export function useBoxPrices() {
  const { chain } = useNetwork()
  const [ prices, setPrices ] = useState<PricesType>({
    Cheap: process.env.NEXT_PUBLIC_MINT_POLYGON_CHEAP_BOX_PRICE!,
    Good: process.env.NEXT_PUBLIC_MINT_POLYGON_GOOD_BOX_PRICE!,
    Great: process.env.NEXT_PUBLIC_MINT_POLYGON_GREAT_BOX_PRICE!
  })
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrices({
        Cheap: process.env.NEXT_PUBLIC_MINT_POLYGON_CHEAP_BOX_PRICE!,
        Good: process.env.NEXT_PUBLIC_MINT_POLYGON_GOOD_BOX_PRICE!,
        Great: process.env.NEXT_PUBLIC_MINT_POLYGON_GREAT_BOX_PRICE!
      })
    }
    
    if (chain.name.includes('Linea')) {
      setPrices({
        Cheap: process.env.NEXT_PUBLIC_MINT_LINEA_CHEAP_BOX_PRICE!,
        Good: process.env.NEXT_PUBLIC_MINT_LINEA_GOOD_BOX_PRICE!,
        Great: process.env.NEXT_PUBLIC_MINT_LINEA_GREAT_BOX_PRICE!
      })
    }

  }, [chain?.name])

  return prices;
}