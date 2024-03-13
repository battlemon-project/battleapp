import { toast } from 'react-toastify';
import { useContract } from 'hooks/useContract';
import { encodePacked } from 'viem';
import { useItemQuote } from './generated';
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { chainToLayerZero } from 'utils/misc';

export type BridgeItemArray = [
  `0x${string}`,
  bigint,
  number,
  number,
  bigint,
  bigint,
  bigint,
  `0x${string}`
]

export type BridgeItemProps = {
  chainId: number,
  dataArray: BridgeItemArray
}

// const itemContracts: {[key: number]: `0x${string}`} = {
//   80001: process.env.NEXT_PUBLIC_CONTRACT_LINEA_ITEMS as `0x${string}`, // mumbai
//   137: process.env.NEXT_PUBLIC_CONTRACT_LINEA_ITEMS as `0x${string}`, // polygon mainnet
//   59140: process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS as `0x${string}`, // linea goerli
//   59144: process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS as `0x${string}`, // linea mainnet
//   56: process.env.NEXT_PUBLIC_CONTRACT_BNB_ITEMS as `0x${string}`, // bnb testnet
//   97: process.env.NEXT_PUBLIC_CONTRACT_BNB_ITEMS as `0x${string}`, // bnb mainnet
// }

export function useLayerZeroQuoteItem({ chainId, dataArray }: BridgeItemProps) {
  const NEXT_PUBLIC_CONTRACT_ITEMS = useContract('ITEMS')
  const options = Options.newOptions().addExecutorLzReceiveOption(300000, 0).toHex().toString() as any;
  const data = encodePacked(
    ["address", "uint256", "uint8", "uint8", "uint", "uint", "uint", "bytes"],
    dataArray
  );

  const itemQuote = useItemQuote({
    address: NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
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
    quote: itemQuote?.data,
    options
  };
}