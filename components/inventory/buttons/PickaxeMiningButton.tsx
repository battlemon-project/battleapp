import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePickaxeStore } from '../store/pickaxeStore';
import { usePickaxeMining } from 'hooks/usePickaxeMining';
import { useGemRank } from 'hooks/useGemRank';

interface PickaxeMiningProps {
  pickaxeId: number
  chainId: number
}

export default function PickaxeMiningButton({ pickaxeId, chainId }: PickaxeMiningProps) {
  const { setMiningStatus, setGemRank } = usePickaxeStore()
  const { pickaxeMining, pickaxeMiningStatus, estimateGas, gemId } = usePickaxeMining(pickaxeId);
  const { getGemRank } = useGemRank();

  const handlePickaxeMining = async () => {
    setGemRank(undefined);
    estimateGas().then(({ gas, gasPrice }) => {
      setMiningStatus('loading')
      pickaxeMining(chainId == 59144 ? {} : { gas, gasPrice })
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
    console.log('test 7')
    console.log(pickaxeMiningStatus)
    setMiningStatus(pickaxeMiningStatus)
  }, [pickaxeMiningStatus])

  
  useEffect(() => {
    console.log('test 8')
    if (gemId == undefined) return;
    getGemRank(gemId).then((rank) => {
      setGemRank(rank)
    })
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