


import { gemABI } from './generated';
import {  usePublicClient } from 'wagmi';
import { useContract } from './useContract';

export function useGemRank() {
  const NEXT_PUBLIC_CONTRACT_GEMS = useContract('GEMS')
  console.log('render useGemRank')
  const publicClient = usePublicClient()

  const getGemRank = async (tokenId: number): Promise<number> => {
    const metaURI = (await publicClient.readContract({
      address: NEXT_PUBLIC_CONTRACT_GEMS as '0x',
      abi: gemABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    })) as string;
    const rank = parseInt(metaURI.split('/').at(-1) as string) - 1;
    return rank;
  };

  return {
    getGemRank
  };
}