import { toast } from 'react-toastify';
import { useContract } from 'hooks/useContract';
import { encodePacked } from 'viem';
import { useLemonQuote } from './generated';
import { Options } from "@layerzerolabs/lz-v2-utilities";

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
  97: 30102, // bnb mainnet
}

// const lemonContracts: {[key: number]: `0x${string}`} = {
//   80001: process.env.NEXT_PUBLIC_CONTRACT_LINEA_LEMONS as `0x${string}`, // mumbai
//   137: process.env.NEXT_PUBLIC_CONTRACT_LINEA_LEMONS as `0x${string}`, // polygon mainnet
//   59140: process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS as `0x${string}`, // linea goerli
//   59144: process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS as `0x${string}`, // linea mainnet
//   56: process.env.NEXT_PUBLIC_CONTRACT_BNB_LEMONS as `0x${string}`, // bnb testnet
//   97: process.env.NEXT_PUBLIC_CONTRACT_BNB_LEMONS as `0x${string}`, // bnb mainnet
// }


export function useLayerZeroQuoteLemon({ chainId, dataArray }: BridgeLemonProps) {
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const options = Options.newOptions().addExecutorLzReceiveOption(500000, 0).toHex().toString() as any;
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