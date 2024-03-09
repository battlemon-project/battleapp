import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRaidByLemonId } from 'hooks/useRaidByLemonId';
import Timer from 'components/layout/Timer';
import LemonReturnFromRaidButton from './LemonReturnFromRaidButton';

interface LemonDungeonProps {
  lemonId: number
}

export default function LemonDungeonButton({ lemonId }: LemonDungeonProps) {
  const { raid } = useRaidByLemonId(lemonId);
  const [ isAvailableReturn, setIsAvailableReturn ] = useState<boolean>(false)

  const finishCountdown = () => {
    setIsAvailableReturn(true)
  }

  useEffect(() => {
    if (!raid) return;
    if (((Number(raid?.finishTimestamp) + 60) * 1000 - Number(new Date())) < 0) {
      finishCountdown();
    }
  }, [raid])

  return (<>
    {!raid && <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>Return from Dungeon</button>}
    {raid && !isAvailableReturn && <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>
      <Timer deadline={(Number(raid.finishTimestamp) + 60) * 1000} key={raid.finishTimestamp} onFinished={finishCountdown} />
    </button>}
    {raid && isAvailableReturn && <LemonReturnFromRaidButton raidId={raid.raidId} />}
  </>
  );
};