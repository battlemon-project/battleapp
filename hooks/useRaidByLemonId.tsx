import { useRaidsGetRaidByLemonId } from './generated';
import { useContract } from './useContract';

export function useRaidByLemonId(lemonId: number) {
  console.log('render useRaidByLemonId')
  const NEXT_PUBLIC_CONTRACT_RAIDS = useContract('RAIDS')
  
  const raid = useRaidsGetRaidByLemonId({
    address: NEXT_PUBLIC_CONTRACT_RAIDS,
    args: [BigInt(lemonId)],
    onError: (error) => {
      console.log(error ? 'balance error when switch' : undefined)
    }
  })
  
  return {
    raid: raid?.data
  };
}