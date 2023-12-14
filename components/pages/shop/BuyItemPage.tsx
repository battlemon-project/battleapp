import cn from 'classnames';
import styles from './shop.module.css'
import Link from 'next/link';
import { truncate } from 'utils/misc';
import { useItemMint } from 'hooks/useItemMint';
import { useItemBalance } from 'hooks/useItemBalance';
import { useEffect, useState } from 'react';
import PolSymbol from 'components/layout/PolSymbol';
import { toast } from 'react-toastify';

export default function BuyItemPage() {
  const [ count, setCount ] = useState<number>(1)
  const { itemMint, itemMintStatus, estimateGas } = useItemMint(count);
  const { balance, refreshBalance } = useItemBalance();

  useEffect(() => {
    if (itemMintStatus !== 'loading') {
      refreshBalance?.();
    }
  }, [itemMintStatus])

  const handleItemMint = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      itemMint({ gas, gasPrice })
    }).catch(e => {
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }


  return (
    <div className="container py-3 mb-auto">
      <Link href="/shop">
        <button className='btn btn-outline-light'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className='ps-2'>Back to Shop</span>
        </button>
      </Link>
      <div className="row mt-3">
        <div className='col-12 col-md-5 mb-4'>
          <img className={cn('rounded-4 img-fluid', styles.lightBg)} src="/images/shop/items-gallery.gif" />
        </div>
        <div className="col-12 col-md-7">
          <div className={cn('p-3 py-4 rounded-4 mb-4', styles.lightBg)}>
            <p className="mb-3">The items are boost for the character. Each item has luck, agility, and speed, which affect the results of the raid. The more items you wear into the raid, the better your results will be.</p>
            <div className="d-flex justify-content-between mb-2">
              <b>Contract Address</b>
              <div>{truncate(process.env.NEXT_PUBLIC_CONTRACT_ITEMS!, 8)}</div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <b>Token Standard</b>
              <div>ERC721</div>
            </div>
            <div className="d-flex justify-content-between ">
              <b>Network</b>
              <div className='fs-16'><PolSymbol>Polygon</PolSymbol></div>
            </div>
          </div>

          <div className="d-flex mb-4">
            <button className={cn('btn btn-lg btn-outline-light py-1', { disabled: count < 2 })} onClick={() => setCount(count - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/></svg>
            </button>
            <button className={cn('d-flex justify-content-center mx-2', styles.buyBtn)} onClick={handleItemMint}>
              { itemMintStatus == 'loading' ? 
                <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                <div className='d-flex'>
                  <span className='fs-17 fst-italic pe-2'>Buy {count} Item{count > 1 ? 's' : ''} for </span>
                  <span className='fs-15'><PolSymbol>{(Number(process.env.NEXT_PUBLIC_MINT_ITEMS_PRICE) * (count || 1)).toFixed(10).replace(/\.?0+$/,"")} MATIC</PolSymbol></span>
                </div>
              }
            </button>
            <button className={cn('btn btn-lg btn-outline-light py-1', { disabled: count > 9 })} onClick={() => setCount(count + 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
            </button>
          </div>
          
          {!!balance && <Link href="/hub/items">
            <button className='btn btn-lg btn-outline-light w-100'>
              <span className='ps-2'>Look at your {balance} item{balance !== 1 ? 's' : ''} in NFT Hub</span>
            </button>
          </Link>}
        </div>
      </div>
    </div>
  );
};