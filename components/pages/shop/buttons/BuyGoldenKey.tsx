import cn from 'classnames';
import styles from '../shop.module.css'
import { useGoldenKeyMint } from 'hooks/useGoldenKeyMint';
import { useGoldenKeyBalance } from 'hooks/useGoldenKeyBalance';
import { useEffect, useState } from 'react';
import PolSymbol from 'components/layout/PolSymbol';
import { toast } from 'react-toastify';
import type { Chain } from 'viem';
import { useKeyPrice } from 'hooks/useKeyPrice';
import Link from 'next/link';

interface BuyGoldenKeyProps {
  chain: Chain
  address: `0x${string}`
  contract: `0x${string}`
}

export default function BuyGoldenKey({ chain, address, contract}: BuyGoldenKeyProps) {
  const [ count, setCount ] = useState<number>(1);
  const keyPrice = useKeyPrice();
  const { goldenKeyMint, goldenKeyMintStatus, estimateGas } = useGoldenKeyMint(address, contract, count, keyPrice);
  const { balance, refreshBalance } = useGoldenKeyBalance();

  useEffect(() => {
    if (goldenKeyMintStatus !== 'loading') {
      refreshBalance?.();
    }
  }, [goldenKeyMintStatus])

  const handleGoldenKeyMint = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      goldenKeyMint({ gas, gasPrice })
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
      <button className={cn('btn btn-lg btn-outline-light py-1', { disabled: count < 2 })} onClick={() => setCount(count - 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/></svg>
      </button>
      <button className={cn('d-flex justify-content-center mx-2', styles.buyBtn)} onClick={handleGoldenKeyMint}>
        { goldenKeyMintStatus == 'loading' || goldenKeyMintStatus == 'process' ? 
          <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
          <div className='d-flex'>
            <span className='fs-17 fst-italic pe-2'>Buy {count} Key{count > 1 ? 's' : ''} for </span>
            <span className='fs-15'><PolSymbol>{(Number(keyPrice) * (count || 1)).toFixed(10).replace(/\.?0+$/,"")} {chain?.nativeCurrency.symbol}</PolSymbol></span>
          </div>
        }
      </button>
      <button className={cn('btn btn-lg btn-outline-light py-1', { disabled: count > 9 })} onClick={() => setCount(count + 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
      </button>
    </div>
    
    {!!balance && <Link href="/game">
      <button className='btn btn-lg btn-outline-light w-100'>
        <span className='ps-2'>Open BOX (you have {balance} Key{balance !== 1 ? 's' : ''})</span>
      </button>
    </Link>}  
  </>
  );
};