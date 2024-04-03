import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';
import { simpleFetcher } from 'utils/fetcher';
import { NftMetaData } from 'lemon';

interface ParkKeyProps {
  chainId: number
  contract: `0x${string}`
  balance: number
  setLineaParkKey: Dispatch<SetStateAction<NftMetaData | undefined>>
}

export default function ParkKey({ contract, chainId, balance, setLineaParkKey }: ParkKeyProps) {
  const { data, mutate } = useSWR(
    contract,
    simpleFetcher({ type: 'park', pageSize: 100, chainId }), 
    { revalidateOnFocus: false }
  )

  const handleSelect = (e: React.MouseEvent) => {
    if (!data?.tokens.length) return
    e.preventDefault();
    setLineaParkKey(data.tokens[0])
  }

  useEffect(() => {
    if (!balance) return
    mutate()
  }, [balance])

  return (<>
    {balance && data?.tokens && <li><a className="dropdown-item" href="#" onClick={handleSelect}>Linea Park NFT ({data?.tokens.length})</a></li>}
  </>
  );
};