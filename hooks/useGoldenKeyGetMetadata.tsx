import { useGoldenKeyMetadata } from './generated';
import { useContract } from './useContract';

export function useGoldenKeyGetMetadata(contract: `0x${string}`, id: number) {
  
  const metadata = useGoldenKeyMetadata(contract ? {
    address: contract,
    args: [BigInt(id)],
    onError: (error) => {
      console.log(error ? 'balance error when switch' : undefined)
    }
  } : undefined)

  const refresh = () => {
    if (contract) {
      metadata?.refetch()
    }
  }

  // useEffect(() => {
  //   window.addEventListener("focus", refresh);
  //   return () => {
  //     window.removeEventListener("focus", refresh);
  //   };
  // }, []);
  
  return {
    metadata: (metadata?.data ? {
      nextBoxTimestamp: Number(metadata?.data[0]),
      nextPointsTimestamp: Number(metadata?.data[1])
    } :  undefined),
    refresh
  };
}