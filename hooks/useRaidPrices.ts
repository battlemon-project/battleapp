
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

type PricesType = [string, string, string]

export function useRaidPrices() {
  console.log('render useRaidPrices')
  const { chain } = useNetwork()
  const [ prices, setPrices ] = useState<PricesType>([
    process.env.NEXT_PUBLIC_PRICE_POLYGON_RAID!,
    process.env.NEXT_PUBLIC_PRICE_POLYGON_RAID!,
    process.env.NEXT_PUBLIC_PRICE_POLYGON_RAID!
  ])
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrices([
        process.env.NEXT_PUBLIC_PRICE_POLYGON_RAID!,
        process.env.NEXT_PUBLIC_PRICE_POLYGON_RAID!,
        process.env.NEXT_PUBLIC_PRICE_POLYGON_RAID!
      ])
    }
    
    if (chain.name.includes('Linea')) {
      setPrices([
        process.env.NEXT_PUBLIC_PRICE_LINEA_RAID!,
        process.env.NEXT_PUBLIC_PRICE_LINEA_RAID!,
        process.env.NEXT_PUBLIC_PRICE_LINEA_RAID!
      ])
    }

  }, [chain?.name])

  return prices;
}