import cn from 'classnames';
import styles from '../shop.module.css'
import { useEffect, useState } from 'react';
import PolSymbol from 'components/layout/PolSymbol';
import { toast } from 'react-toastify';
import { BoxType, useBuyBox } from 'hooks/useBuyBox';
import { useBoxStore } from '../store/boxStore';
import { useBoxPrices } from 'hooks/useBoxPrices';
import { useNetwork } from 'wagmi';

interface BuyBoxProps {
  boxType: BoxType
  prizeType: number
}

export default function BuyBox({ boxType, prizeType }: BuyBoxProps) {
  const { chain } = useNetwork();
  const boxPrices = useBoxPrices()
  const { buyBox, buyBoxStatus, estimateGas, prize } = useBuyBox(boxType, prizeType);
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
    setStatus(buyBoxStatus)
    setBox(boxType)
  }, [buyBoxStatus])

  
  useEffect(() => {
    if (!prize) return;
    setPrize(prize);
  }, [prize])

  return (<>
    <div className="d-flex mb-4">
      <button className={cn('d-flex justify-content-center', styles.buyBtn, { [styles.process]: buyBoxStatus == 'loading' || buyBoxStatus == 'process' })} onClick={handleBuyBox}>
        { buyBoxStatus == 'loading' || buyBoxStatus == 'process' ? 
          <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
          <div className='d-flex'>
            <span className='fs-17 fst-italic pe-2'>{boxType} Box </span>
            <span className='fs-15'><PolSymbol>{boxPrices[boxType]} {chain?.nativeCurrency.symbol}</PolSymbol></span>
          </div>
        }
      </button>
    </div>
  </>
  );
};