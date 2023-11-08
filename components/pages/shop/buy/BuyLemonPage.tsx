import cn from 'classnames';
import styles from './buy.module.css'
import EthSymbol from 'components/layout/EthSymbol';
import Link from 'next/link';
import { useLemonSafeMint, useLemonBalanceOf } from 'hooks/generated';
import { useEffect } from 'react';

export default function BuyLemonPage() {
  const { write: mint, status } = useLemonSafeMint({
    address: '0x900F9d05eff41bB0d49f72b50AF96464fD2387B4',
    args: [
      '0x0F72317C3b60A065Ba3DCF88ADC7e58CA478aBE1',
    ]
  })

  const { data: lemonBalance, refetch } = useLemonBalanceOf({
    address: '0x900F9d05eff41bB0d49f72b50AF96464fD2387B4',
    args: [
      '0x0F72317C3b60A065Ba3DCF88ADC7e58CA478aBE1',
    ]
  })

  useEffect(() => {
    console.log(status)
    if (status === 'success') {
      refetch().then(() => {
        console.log(lemonBalance)
      });
    }
    
  }, [status])

  return (
    <div className="container py-3">
      <Link href="/shop">
        <button className='btn rounded-4 btn-outline-light'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className='ps-2'>Back to Shop {lemonBalance?.toString()}</span>
        </button>
      </Link>
      <div className="row mt-3">
        <div className='col-12 col-md-5 mb-4'>
          <div className={cn('p-3 py-4 rounded-4 text-center', styles.background)}>
            <img src="/images/shop/shadow-lemon.png" className='img-fluid' />
          </div>
        </div>
        <div className="col-12 col-md-7">
          <div className={cn('p-3 py-4 rounded-4 mb-4', styles.background)}>
            <p className="mb-3">Unique Key-card that gives access to the incredible game world of Lemoland, full of adventures and NFT treasures. </p>
            <p className="mb-3">Unique NFT key-pass will be available in Testnet and also transferred to Mainnet.</p>
            <div className="d-flex justify-content-between mb-2">
              <b>Contract Address</b>
              <div>0xd622Dc376...80Ca3A19F2</div>
            </div>
            <div className="d-flex justify-content-between">
              <b>Token Standard</b>
              <div>ERC721</div>
            </div>
          </div>


          <button className={cn('d-flex justify-content-center', styles.buyBtn)} onClick={() => mint()}>
            <span className='fs-17 fst-italic pe-2'>Buy Lemon for </span>
            <EthSymbol>0.05</EthSymbol>
          </button>
        </div>
      </div>
    </div>
  );
};