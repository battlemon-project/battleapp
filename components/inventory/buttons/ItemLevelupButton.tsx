import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useItemLevelup } from 'hooks/useItemLevelup';

interface ItemLevelupProps {
  address: `0x${string}`,
  itemId: number,
  gemId: number
  chainId: number
}

export default function ItemLevelupButton({ address, itemId, gemId, chainId }: ItemLevelupProps) {
  const { itemLevelup, itemLevelupStatus, estimateGas } = useItemLevelup(address, itemId, gemId);

  const handleStickerMerge = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      //setLevelUpStatus('loading')
      itemLevelup(chainId == 59144 ? {} : { gas, gasPrice })
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
  //   setLevelUpStatus(itemLevelupStatus)
  // }, [itemLevelupStatus])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={handleStickerMerge}>
      { itemLevelupStatus == 'loading' || itemLevelupStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Level Up</>
      }
    </button>
  </>
  );
};