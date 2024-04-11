import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { NftMetaData } from 'lemon';
import Timer from 'components/layout/Timer';
import useSWR from 'swr';
import { simpleFetcher } from 'utils/fetcher';
import GoldenKey from './GoldenKey';

interface GoldenKeysListProps {
  balance: number
  chainId: number
  contract: `0x${string}`
  setGoldenKey: Dispatch<SetStateAction<number | undefined>>
  readyKeys: Record<number, boolean | undefined>
  setReadyKeys: Dispatch<SetStateAction<Record<number, boolean | undefined>>>
}

export default function GoldenKeysList({ balance, contract, chainId, setGoldenKey, readyKeys, setReadyKeys }: GoldenKeysListProps) {
  const { data, mutate } = useSWR(
    contract,
    simpleFetcher({ type: 'key', pageSize: 20, chainId }), 
    { revalidateOnFocus: false, revalidateOnMount: false }
  )

  useEffect(() => {
    if (!balance) return;
    mutate()
  }, [balance])
  
  return (<>
    {data?.tokens.map(nft => {
      return <Fragment key={`${nft.tokenId}-${readyKeys[nft.tokenId]}`}>
        <GoldenKey id={nft.tokenId} contract={contract} setGoldenKey={setGoldenKey} readyKeys={readyKeys} setReadyKeys={setReadyKeys} />
      </Fragment>
    })}
  </>
  );
};