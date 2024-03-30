import { useReferralGetUserRef } from './generated';
import { useAccount } from 'wagmi';
import { useContract } from 'hooks/useContract';
import { useEffect } from 'react';

export function useReferralGetUser(address: `0x${string}` | undefined) {
  const NEXT_PUBLIC_CONTRACT_REFERRAL = useContract('REFERRAL')

  const referral = useReferralGetUserRef(address ? {
    address: NEXT_PUBLIC_CONTRACT_REFERRAL as '0x',
    args: [address]
  } : undefined)

  const onFocus = () => {
    referral?.refetch()
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return {
    myReferral: referral?.data && !referral.data.includes('0000000000000000') ? referral?.data : undefined,
    refreshReferral: referral?.refetch
  };
}