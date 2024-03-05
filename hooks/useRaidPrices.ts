
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

type PricesType = [string, string, string]

export function useRaidPrices() {
  console.log('render useRaidPrices')
  const { chain } = useNetwork()
  const [ prices, setPrices ] = useState<PricesType>([
    process.env.NEXT_PUBLIC_RAID_POLYGON_PRICE!,
    process.env.NEXT_PUBLIC_RAID_POLYGON_PRICE!,
    process.env.NEXT_PUBLIC_RAID_POLYGON_PRICE!
  ])
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrices([
        process.env.NEXT_PUBLIC_RAID_POLYGON_PRICE!,
        process.env.NEXT_PUBLIC_RAID_POLYGON_PRICE!,
        process.env.NEXT_PUBLIC_RAID_POLYGON_PRICE!
      ])
    }
    
    if (chain.name.includes('Linea')) {
      setPrices([
        process.env.NEXT_PUBLIC_RAID_LINEA_PRICE!,
        process.env.NEXT_PUBLIC_RAID_LINEA_PRICE!,
        process.env.NEXT_PUBLIC_RAID_LINEA_PRICE!
      ])
    }

  }, [chain?.name])

  return prices;
}