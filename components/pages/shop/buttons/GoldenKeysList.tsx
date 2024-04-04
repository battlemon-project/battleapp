import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NftMetaData } from 'lemon';
import Timer from 'components/layout/Timer';

interface GoldenKeysListProps {
  allKeys: {
    id: number;
    nextPointsTimestamp: number;
    nextBoxTimestamp: number;
  }[]
  chainId: number
  contract: `0x${string}`
  setGoldenKey: Dispatch<SetStateAction<number | undefined>>
}

export default function GoldenKeysList({ contract, chainId, allKeys, setGoldenKey }: GoldenKeysListProps) {
  const [ready, setReady] = useState<Record<number, boolean | undefined>>({})

  const handleSelect = (id: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setGoldenKey(id)
  }

  // useEffect(() => {
  //   if (!allKeys) return;
  //   setReady(allKeys[1].map(key => (Number(key.nextBoxTimestamp) * 1000 - Number(new Date())) < 0));
  // }, [allKeys])
  
  return (<>
    {allKeys ? allKeys.toSorted((a,b) => a.nextBoxTimestamp - b.nextBoxTimestamp).slice(0, 3).map(({ id, nextBoxTimestamp }) => {
      return <li key={id}>
        <a className={`dropdown-item ${!ready[id] && (Number(nextBoxTimestamp) * 1000 - Number(new Date())) >= 0 ? 'disabled' : '' }`} onClick={handleSelect(id)} href="#">Key #{id % 10000000} {!ready[id] && (Number(nextBoxTimestamp) * 1000 - Number(new Date())) >= 0 && <>(<Timer deadline={Number(nextBoxTimestamp) * 1000} key={id} onFinished={() => {
          setReady({ ...ready, [id]: true});
        }} />)</>}</a>
      </li>
    }) : <></>}
    {allKeys.length > 5 ? <li><a className={`dropdown-item disabled`}>{allKeys.length - 5} {(allKeys.length - 5) > 1 ? 'keys are' : 'key is'} hidden</a></li> : <></> }
  </>
  );
};