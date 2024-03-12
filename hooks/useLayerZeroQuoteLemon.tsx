import { toast } from 'react-toastify';
import { useContract } from 'hooks/useContract';
import { encodePacked } from 'viem';
import { useLemonQuote } from './generated';
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { NftMetaData } from 'lemon';

export type BridgeLemonArray = [
  `0x${string}`,
  bigint,
  number,
  number,
  `0x${string}`,
  bigint,
  bigint,
  bigint
]

export type BridgeLemonProps = {
  chainId: number,
  dataArray: BridgeLemonArray
}

export const chainToLayerZero: {[key: number]: number} = {
  80001: 40109, // mumbai
  137: 30109, // polygon mainnet
  59140: 40157, // linea goerli
  59144: 30183, // linea mainnet
  56: 40102, // bnb testnet
  97: 30102, // bnb mainnet,
  168587773: 40243, // blast testnet, 
  81457: 30243, // blast mainnet, 
}

export const chainIds = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? {
  polygon: 80001,
  linea: 59140,
  bnb: 56,
  blast: 168587773
} : {
  polygon: 137,
  linea: 59144,
  bnb: 97,
  blast: 81457 
}

export const bridgeChains: NftMetaData[] = [
  {
    tokenId: chainIds.polygon,
    image: '/images/brands/Sticker_Polygon.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  },
  {
    tokenId: chainIds.linea,
    image: '/images/brands/Sticker_Linea.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  },
  // {
  //   tokenId: chainIds.bnb,
  //   image: '/images/brands/Sticker_BNB.svg',
  //   properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  // },
  {
    tokenId: chainIds.blast,
    image: '/images/brands/Sticker_Blast.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  },
  {
    tokenId: 4,
    image: '/images/brands/Sticker_SKALE.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  }
]

export function useLayerZeroQuoteLemon({ chainId, dataArray }: BridgeLemonProps) {
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const options = Options.newOptions().addExecutorLzReceiveOption(400000, 0).toHex().toString() as any;
  const data = encodePacked(
    ["address", "uint256", "uint8", "uint8", "bytes", "uint", "uint", "uint"],
    dataArray
  );

  const lemonQuote = useLemonQuote({
    address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [chainToLayerZero[chainId], data, options, false],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  return {
    quote: lemonQuote?.data,
    options
  };
}