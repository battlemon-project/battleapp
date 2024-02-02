


import { gemABI } from './generated';
import {  usePublicClient } from 'wagmi';

export function useGemRank() {
  const publicClient = usePublicClient()

  const getGemRank = async (tokenId: number): Promise<number> => {
    const metaURI = (await publicClient.readContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_GEMS as '0x',
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