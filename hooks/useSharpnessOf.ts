import { pickAxeABI } from './generated';
import { usePublicClient } from 'wagmi';
import { useContract } from './useContract';

export function useSharpnessOf() {
  console.log('render useSharpnessOf')
  const NEXT_PUBLIC_CONTRACT_PICKAXES = useContract('PICKAXES')
  const publicClient = usePublicClient()

  const getSharpnessOf = async (tokenId: number): Promise<number> => {
    const sharpness = (await publicClient.readContract({
      address: NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
      abi: pickAxeABI,
      functionName: 'sharpnessOf',
      args: [BigInt(tokenId)],
    }));
    return sharpness;
  };

  return {
    getSharpnessOf
  };
}