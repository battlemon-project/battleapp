
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

type PricesType = [string,string,string]

export function useSharpPrices() {
  console.log('render useShopPrices')
  const { chain } = useNetwork()
  const [ prices, setPrices ] = useState<PricesType>([
    process.env.NEXT_PUBLIC_PRICE_POLYGON_PICKAXE_SHARP_0!,
    process.env.NEXT_PUBLIC_PRICE_POLYGON_PICKAXE_SHARP_1!,
    process.env.NEXT_PUBLIC_PRICE_POLYGON_PICKAXE_SHARP_2!
  ])
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrices([
        process.env.NEXT_PUBLIC_PRICE_POLYGON_PICKAXE_SHARP_0!,
        process.env.NEXT_PUBLIC_PRICE_POLYGON_PICKAXE_SHARP_1!,
        process.env.NEXT_PUBLIC_PRICE_POLYGON_PICKAXE_SHARP_2!
      ])
    }
    
    if (chain.name.includes('Linea')) {
      setPrices([
        process.env.NEXT_PUBLIC_PRICE_LINEA_PICKAXE_SHARP_0!,
        process.env.NEXT_PUBLIC_PRICE_LINEA_PICKAXE_SHARP_1!,
        process.env.NEXT_PUBLIC_PRICE_LINEA_PICKAXE_SHARP_2!
      ])
    }

  }, [chain?.name])

  return prices;
}