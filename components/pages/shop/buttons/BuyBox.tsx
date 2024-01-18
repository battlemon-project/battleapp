import cn from 'classnames';
import styles from '../shop.module.css'
import { useEffect, useState } from 'react';
import PolSymbol from 'components/layout/PolSymbol';
import { toast } from 'react-toastify';
import { BoxType, boxPrices, useBuyBox } from 'hooks/useBuyBox';
import { useBoxStore } from '../store/boxStore';

interface BuyBoxProps {
  type: BoxType
}

export default function BuyBox({ type }: BuyBoxProps) {
  const { buyBox, buyBoxStatus, estimateGas, prize } = useBuyBox(type, 400);
  const { setStatus, setBox, setPrize } = useBoxStore()

  const handleBuyBox = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      setStatus('loading')
      buyBox({ gas, gasPrice })
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
    console.log(type, buyBoxStatus)
    setStatus(buyBoxStatus)
    setBox(type)
  }, [buyBoxStatus])

  
  useEffect(() => {
    if (!prize) return;
    setPrize(prize);
  }, [prize])

  return (<>
    <div className="d-flex mb-4">
      <button className={cn('d-flex justify-content-center', styles.buyBtn)} onClick={handleBuyBox}>
        { buyBoxStatus == 'loading' ? 
          <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
          <div className='d-flex'>
            <span className='fs-17 fst-italic pe-2'>{type} Box </span>
            <span className='fs-15'><PolSymbol>{boxPrices[type]} MATIC</PolSymbol></span>
          </div>
        }
      </button>
    </div>
  </>
  );
};