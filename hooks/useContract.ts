
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

const dictionary = {
  POLYGON: {
    BOXES: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_BOXES'] as '0x',
    POINTS: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_POINTS'] as '0x',
    ITEMS: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS'] as '0x',
    LEMONS: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS'] as '0x',
    PICKAXES: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_PICKAXES'] as '0x',
    GEMS: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_GEMS'] as '0x',
    STICKERS: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_STICKERS'] as '0x',
  },
  LINEA: {
    BOXES: process.env['NEXT_PUBLIC_CONTRACT_LINEA_BOXES'] as '0x',
    POINTS: process.env['NEXT_PUBLIC_CONTRACT_LINEA_POINTS'] as '0x',
    ITEMS: process.env['NEXT_PUBLIC_CONTRACT_LINEA_ITEMS'] as '0x',
    LEMONS: process.env['NEXT_PUBLIC_CONTRACT_LINEA_LEMONS'] as '0x',
    PICKAXES: process.env['NEXT_PUBLIC_CONTRACT_LINEA_PICKAXES'] as '0x',
    GEMS: process.env['NEXT_PUBLIC_CONTRACT_LINEA_GEMS'] as '0x',
    STICKERS: process.env['NEXT_PUBLIC_CONTRACT_LINEA_STICKERS'] as '0x',
  }
}

export function useContract(name: 'BOXES' | 'POINTS' | 'ITEMS' | 'LEMONS' | 'PICKAXES' | 'GEMS' | 'STICKERS') {
  console.log('render useContract')
  const { chain } = useNetwork()
  const [ contract, setContract ] = useState<`0x${string}`>()
  
  useEffect(() => {
    if (!chain?.name) return;
    
    if (chain.name.includes('Polygon')) {
      setContract(dictionary.POLYGON[name])
      return;
    }
    
    if (chain.name.includes('Linea')) {
      setContract(dictionary.LINEA[name])
      return;
    }

  }, [chain?.name])

  return contract;
}