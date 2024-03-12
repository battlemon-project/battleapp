import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useStickerStore } from '../store/stickerStore';
import { useStickerMerge } from 'hooks/useStickerMerge';
import { NftMetaData } from 'lemon';

interface StickerRepairProps {
  selectedStickers: NftMetaData[]
  chainId: number
}

export default function StickerMergeButton({ selectedStickers, chainId }: StickerRepairProps) {
  const { setMergeStatus } = useStickerStore()
  const { stickerMerge, stickerMergeStatus, estimateGas } = useStickerMerge(selectedStickers[0].tokenId, selectedStickers[1].tokenId, selectedStickers[2].tokenId, selectedStickers[3].tokenId);

  const handleStickerMerge = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      setMergeStatus('loading')
      stickerMerge(chainId == 59144 ? {} : { gas, gasPrice })
    }).catch(e => {
      setMergeStatus('idle')
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    setMergeStatus(stickerMergeStatus)
  }, [stickerMergeStatus])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: selectedStickers.length < 2 })} onClick={handleStickerMerge}>
      { stickerMergeStatus == 'loading' || stickerMergeStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Merge</>
      }
    </button>
  </>
  );
};