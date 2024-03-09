import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLemonDungeon } from 'hooks/useLemonDungeon';

interface LemonStartDungeonProps {
  lemonId: number
}

export default function LemonStartDungeonButton({ lemonId }: LemonStartDungeonProps) {
  const { lemonRaid, lemonRaidStatus, estimateGas } = useLemonDungeon(lemonId, 0);

  const handleLemonDungeon = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      lemonRaid({ gas, gasPrice })
    }).catch(e => {
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    console.log('raid status', lemonRaidStatus)
  }, [lemonRaidStatus])


  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: lemonId < 0 })} onClick={handleLemonDungeon}>
      { lemonRaidStatus == 'loading' || lemonRaidStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Dungeon</>
      }
    </button>
  </>
  );
};