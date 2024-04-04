
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

export function useBattleBoxPrice() {
  const { chain } = useNetwork()
  const [ price, setPrice ] = useState<string>(process.env.NEXT_PUBLIC_PRICE_POLYGON_BATTLE_BOX!)
  
  useEffect(() => {
    if (!chain?.name) return;

    if (chain.name.includes('Polygon')) {
      setPrice(process.env.NEXT_PUBLIC_PRICE_POLYGON_BATTLE_BOX!)
    }
    
    if (chain.name.includes('Linea')) {
      setPrice(process.env.NEXT_PUBLIC_PRICE_LINEA_BATTLE_BOX!)
    }

  }, [chain?.name])

  return price;
}