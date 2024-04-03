import cn from 'classnames';
import styles from '../shop.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { StatusType } from 'hooks/useBuyBox';
import { useWaitForTransaction } from 'wagmi';
import { useBuyBattleBox } from 'hooks/useBuyBattleBox';
import { useBoxStore } from '../store/boxStore';
import { NftMetaData } from 'lemon';

interface ParkBurnProps {
  tokenId: number
  chainId: number
  contract: `0x${string}`
  setLineaParkKey: Dispatch<SetStateAction<NftMetaData | undefined>>
}

export default function ParkBurn({ contract, tokenId, chainId, setLineaParkKey }: ParkBurnProps) {
  const { buyBattleBox, buyBattleBoxStatus, estimateGas } = useBuyBattleBox(contract, tokenId, false);
  const { setStatus, setBox, setPrize } = useBoxStore();

  const handleBuyBattleBox = async () => {
    setPrize(undefined)
    estimateGas().then(({ gas, gasPrice }) => {
      setStatus('loading')
      buyBattleBox(chainId == 59144 ? {} : { gas, gasPrice })
    }).catch(e => {
      setStatus('idle')
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    setStatus(buyBattleBoxStatus)
    if (buyBattleBoxStatus == 'success') {
      setLineaParkKey(undefined);
    }
  }, [buyBattleBoxStatus])

  return (<>
    <button type="button" className={cn('d-flex justify-content-center btn btn-default', styles.buyBtn, { [styles.process]: buyBattleBoxStatus == 'loading' })} onClick={handleBuyBattleBox}>
      { buyBattleBoxStatus == 'loading' || buyBattleBoxStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
        <div className='d-flex'>
          <span className='fs-15'>BURN</span>
        </div>
      }
    </button>
  </>
  );
};