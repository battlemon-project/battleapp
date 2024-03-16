
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

interface PricesType {
  Cheap: string,
  Good: string,
  Great: string
}

export function useBoxPrices() {
  console.log('render useBoxPrices')
  const { chain } = useNetwork()
  const [ prices, setPrices ] = useState<PricesType>({
    Cheap: process.env.NEXT_PUBLIC_PRICE_POLYGON_CHEAP_BOX!,
    Good: process.env.NEXT_PUBLIC_PRICE_POLYGON_GOOD_BOX!,
    Great: process.env.NEXT_PUBLIC_PRICE_POLYGON_GREAT_BOX!
  })
  const [ symbol, setSymbol ] = useState<string>('Matic')
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrices({
        Cheap: process.env.NEXT_PUBLIC_PRICE_POLYGON_CHEAP_BOX!,
        Good: process.env.NEXT_PUBLIC_PRICE_POLYGON_GOOD_BOX!,
        Great: process.env.NEXT_PUBLIC_PRICE_POLYGON_GREAT_BOX!
      })
      setSymbol('Matic')
    }
    
    if (chain.name.includes('Linea')) {
      setPrices({
        Cheap: process.env.NEXT_PUBLIC_PRICE_LINEA_CHEAP_BOX!,
        Good: process.env.NEXT_PUBLIC_PRICE_LINEA_GOOD_BOX!,
        Great: process.env.NEXT_PUBLIC_PRICE_LINEA_GREAT_BOX!
      })
      setSymbol('Eth')
    }

  }, [chain?.name])

  return { prices, symbol };
}