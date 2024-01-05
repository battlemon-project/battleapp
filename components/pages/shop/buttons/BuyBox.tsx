import cn from 'classnames';
import styles from '../shop.module.css'
import { useState } from 'react';
import PolSymbol from 'components/layout/PolSymbol';
import { toast } from 'react-toastify';
import { BoxType, boxPrices, useBuyBox } from 'hooks/useBuyBox';

interface BuyBoxProps {
  type: BoxType
}

export default function BuyBox({ type }: BuyBoxProps) {
  const { buyBox, buyBoxStatus, estimateGas } = useBuyBox(type);

  const handleBuyBox = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      buyBox({ gas, gasPrice })
    }).catch(e => {
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  return (<>
    <div className="d-flex mb-4">
      <button className={cn('d-flex justify-content-center mx-2', styles.buyBtn)} onClick={handleBuyBox}>
        { buyBoxStatus == 'loading' ? 
          <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
          <div className='d-flex'>
            <span className='fs-17 fst-italic pe-2'>Buy {type} Box for </span>
            <span className='fs-15'><PolSymbol>{boxPrices[type]} MATIC</PolSymbol></span>
          </div>
        }
      </button>
    </div>
  </>
  );
};