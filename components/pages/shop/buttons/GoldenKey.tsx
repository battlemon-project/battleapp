import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NftMetaData } from 'lemon';
import Timer from 'components/layout/Timer';
import useSWR from 'swr';
import { simpleFetcher } from 'utils/fetcher';
import { useGoldenKeyGetMetadata } from 'hooks/useGoldenKeyGetMetadata';

interface GoldenKeysListProps {
  id: number
  contract: `0x${string}`
  setGoldenKey: Dispatch<SetStateAction<number | undefined>>
  readyKeys: Record<number, boolean | undefined>
  setReadyKeys: Dispatch<SetStateAction<Record<number, boolean | undefined>>>
}

export default function GoldenKey({ id, contract, setGoldenKey, readyKeys, setReadyKeys }: GoldenKeysListProps) {
  const { metadata } = useGoldenKeyGetMetadata(contract, id);

  const handleSelect = (id: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setGoldenKey(id)
  }

  // useEffect(() => {
  //   if (!allKeys) return;
  //   setReady(allKeys[1].map(key => (Number(key.nextBoxTimestamp) * 1000 - Number(new Date())) < 0));
  // }, [allKeys])
  
  return (<>
    <a className={`dropdown-item ${metadata && !readyKeys[id] && (Number(metadata.nextBoxTimestamp) * 1000 - Number(new Date())) >= 0 ? 'disabled order-1' : 'order-0' }`} onClick={handleSelect(id)} href="#">Key #{id % 10000000} {metadata && !readyKeys[id] && (Number(metadata.nextBoxTimestamp) * 1000 - Number(new Date())) >= 0 && <>(<Timer deadline={Number(metadata.nextBoxTimestamp) * 1000} key={id} onFinished={() => setReadyKeys({
      ...readyKeys,
      [id]: true
    })} />)</>}</a>
  </>
  );
};