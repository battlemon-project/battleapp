import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGemStore } from '../store/gemStore';
import { useGemMerge } from 'hooks/useGemMerge';
import { NftMetaData } from 'lemon';

interface GemMergeProps {
  selectedGems: NftMetaData[]
  chainId: number
}

export default function GemMergeButton({ selectedGems, chainId }: GemMergeProps) {
  const { setMergeStatus } = useGemStore()
  const { gemMerge, gemMergeStatus, estimateGas } = useGemMerge(selectedGems[0].tokenId, selectedGems[1].tokenId);

  const handleGemMerge = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      setMergeStatus('loading')
      gemMerge(chainId == 59144 ? {} : { gas, gasPrice })
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
    setMergeStatus(gemMergeStatus)
  }, [gemMergeStatus])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: selectedGems.length < 2 })} onClick={handleGemMerge}>
      { gemMergeStatus == 'loading' || gemMergeStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Merge</>
      }
    </button>
  </>
  );
};