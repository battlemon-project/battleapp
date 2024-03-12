import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePickaxeStore } from '../store/pickaxeStore';
import { usePickaxeRepair } from 'hooks/usePickaxeRepair';

interface PickaxeRepairProps {
  pickaxeId: number
  pickaxeType: number
  chainId: number
}

export default function PickaxeRepairButton({ pickaxeId, pickaxeType, chainId }: PickaxeRepairProps) {
  const { setRepairStatus } = usePickaxeStore()
  const { pickaxeRepair, pickaxeRepairStatus, estimateGas } = usePickaxeRepair(pickaxeId, pickaxeType);

  const handlePickaxeRepair = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      setRepairStatus('loading')
      pickaxeRepair(chainId == 59144 ? { gas, gasPrice } : {})
    }).catch(e => {
      setRepairStatus('idle')
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    setRepairStatus(pickaxeRepairStatus)
  }, [pickaxeRepairStatus])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: pickaxeId < 0 })} onClick={handlePickaxeRepair}>
      { pickaxeRepairStatus == 'loading' || pickaxeRepairStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Repair</>
      }
    </button>
  </>
  );
};