import { pickAxeABI } from './generated';
import {  usePublicClient } from 'wagmi';

export function useSharpnessOf() {
  console.log('render useSharpnessOf')
  const publicClient = usePublicClient()

  const getSharpnessOf = async (tokenId: number): Promise<number> => {
    const sharpness = (await publicClient.readContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_PICKAXES as '0x',
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