import cn from 'classnames';
import { toast } from 'react-toastify';
import { useRaidReturnLemon } from 'hooks/useRaidReturnLemon';

interface LemonReturnFromRaidProps {
  raidId: bigint
  chainId: number
}

export default function LemonReturnFromRaidButton({ raidId, chainId }: LemonReturnFromRaidProps) {
  const { returnLemonRaid, returnLemonRaidStatus, estimateGas } = useRaidReturnLemon(raidId);

  const handleReturnLemon = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      returnLemonRaid(chainId == 59144 ? { gas, gasPrice } : {})
    }).catch(e => {
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={handleReturnLemon}>
      { returnLemonRaidStatus == 'loading' || returnLemonRaidStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Return from Dungeon </>
      }
    </button>
  </>);
};