
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

const dictionary = {
  POLYGON: {
    BOXES: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_BOXES'] as '0x',
    POINTS: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_POINTS'] as '0x',
    ITEMS: process.env['NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS'] as '0x'
  },
  LINEA: {
    BOXES: process.env['NEXT_PUBLIC_CONTRACT_LINEA_BOXES'] as '0x',
    POINTS: process.env['NEXT_PUBLIC_CONTRACT_LINEA_POINTS'] as '0x',
    ITEMS: process.env['NEXT_PUBLIC_CONTRACT_LINEA_ITEMS'] as '0x'
  }
}

export function useContract(name: 'BOXES' | 'POINTS' | 'ITEMS') {
  console.log('render useContract')
  const { chain } = useNetwork()
  const [ contract, setContract ] = useState<`0x${string}`>()
  
  useEffect(() => {
    if (!chain?.name) return;
    if (chain.name.includes('Polygon')) {
      setContract(dictionary.POLYGON[name])
    }
    
    if (chain.name.includes('Linea')) {
      setContract(dictionary.LINEA[name])
    }

  }, [chain?.name])

  return contract;
}