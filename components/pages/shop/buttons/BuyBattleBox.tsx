import cn from 'classnames';
import styles from '../shop.module.css'
import { useEffect, useState } from 'react';
import PolSymbol from 'components/layout/PolSymbol';
import { toast } from 'react-toastify';
import { useBuyBattleBox } from 'hooks/useBuyBattleBox';
import { useBoxStore } from '../store/boxStore';
import { useBoxPrices } from 'hooks/useBoxPrices';
import { useNetwork } from 'wagmi';

interface BuyBattleBoxProps {
  chainId: number
}

export default function BuyBattleBox({ chainId }: BuyBattleBoxProps) {
  const { chain } = useNetwork();
  const { buyBattleBox, buyBattleBoxStatus, estimateGas } = useBuyBattleBox(5, false);
  const { setStatus, setBox, setPrize } = useBoxStore()

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
    //setBox(boxType)
  }, [buyBattleBoxStatus])

  useEffect(() => {
    setStatus(buyBattleBoxStatus)
  }, [buyBattleBoxStatus])

  return (<>
    <div className="d-flex mb-4">
      <div className="btn-group w-100" role="group">
        <button type="button" className={cn('d-flex justify-content-center btn btn-default', styles.buyBtn, { [styles.process]: buyBattleBoxStatus == 'loading' })} onClick={handleBuyBattleBox}>
          { buyBattleBoxStatus == 'loading' ? 
            <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
            <div className='d-flex'>
              <span className='fs-15'>SELECT KEY</span>
            </div>
          }
        </button>

        <div className="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" className="btn btn-default dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li><a className="dropdown-item" href="#">Dropdown link</a></li>
            <li><a className="dropdown-item" href="#">Dropdown link</a></li>
          </ul>
        </div>
      </div>

    </div>
  </>
  );
};