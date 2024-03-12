import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLemonLevelup } from 'hooks/useLemonLevelup';

interface LemonLevelupProps {
  address: `0x${string}`,
  lemonId: number,
  gemId: number
  chainId: number
}

export default function LemonLevelupButton({ address, lemonId, gemId, chainId }: LemonLevelupProps) {
  const { lemonLevelup, lemonLevelupStatus, estimateGas } = useLemonLevelup(address, lemonId, gemId);

  const handleStickerMerge = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      //setLevelUpStatus('loading')
      lemonLevelup(chainId == 59144 ? { gas, gasPrice } : {})
    }).catch(e => {
      //setLevelUpStatus('idle')
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  // useEffect(() => {
  //   setLevelUpStatus(lemonLevelupStatus)
  // }, [lemonLevelupStatus])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={handleStickerMerge}>
      { lemonLevelupStatus == 'loading' || lemonLevelupStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Level Up</>
      }
    </button>
  </>
  );
};