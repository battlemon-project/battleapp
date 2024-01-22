import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePickaxeStore } from '../store/pickaxeStore';
import { usePickaxeMining } from 'hooks/usePickaxeMining';
import { useGemRank } from 'hooks/useGemRank';

interface PickaxeMiningProps {
  pickaxeId: number
}

export default function PickaxeMiningButton({ pickaxeId }: PickaxeMiningProps) {
  const { setMiningStatus, setGemRank } = usePickaxeStore()
  const { pickaxeMining, pickaxeMiningStatus, estimateGas, gemId } = usePickaxeMining(pickaxeId);
  const { getGemRank } = useGemRank();

  const handlePickaxeMining = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      setMiningStatus('loading')
      pickaxeMining({ gas, gasPrice })
    }).catch(e => {
      setMiningStatus('idle')
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    console.log(pickaxeMiningStatus)
    setMiningStatus(pickaxeMiningStatus)
  }, [pickaxeMiningStatus])

  
  useEffect(() => {
    if (!gemId) return;
    getGemRank(gemId).then((rank) => setGemRank(rank))
  }, [gemId])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: pickaxeId < 0 })} onClick={handlePickaxeMining}>
      { pickaxeMiningStatus == 'loading' || pickaxeMiningStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Mining</>
      }
    </button>
  </>
  );
};