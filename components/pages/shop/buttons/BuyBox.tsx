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
  chainId: number
}

export default function BuyBox({ boxType, chainId }: BuyBoxProps) {
  const { chain } = useNetwork();
  const { prices: boxPrices } = useBoxPrices()
  const { buyBox, buyBoxStatus, estimateGas, prize } = useBuyBox(boxType);
  const { setStatus, setBox, setPrize } = useBoxStore()

  const handleBuyBox = async () => {
    setPrize(undefined)
    estimateGas().then(({ gas, gasPrice }) => {
      setStatus('loading')
      buyBox(chainId == 59144 ? {} : { gas, gasPrice })
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
      <button className={cn('d-flex justify-content-center', styles.buyBtn, { [styles.process]: buyBoxStatus == 'loading' })} onClick={handleBuyBox}>
        { buyBoxStatus == 'loading' ? 
          <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
          <div className='d-flex'>
            <span className='fs-15'><PolSymbol>{boxPrices[boxType]} {chain?.nativeCurrency.symbol}</PolSymbol></span>
          </div>
        }
      </button>
    </div>
  </>
  );
};