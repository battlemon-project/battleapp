import cn from 'classnames';
import styles from './shop.module.css'
import EthSymbol from 'components/layout/EthSymbol';
import Link from 'next/link';

export default function ShopPage() {
  return (
    <div className="container py-3">
      <div className={`p-4 rounded-5 ${styles.marketBg}`}>
        <div className={cn('d-flex mb-4', styles.marketBtnsRow)}>
          <div className="col-6">
            <button className={cn(styles.marketBtn)}>MARKETPLACE</button>
          </div>
          <div className="col-6">
            <button className={cn(styles.marketBtn, { [styles.active]: 1 })}>LAUNCHPAD</button>
          </div>
        </div>
        <img className="position-relative rounded-4 img-fluid w-100" src="/images/shop/marketplace-frame.png" />

        <div className="row mt-4">
          <Link href='/shop/lemon' className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4">
            <div className={cn('flex-fill d-flex flex-column justify-content-between', styles.marketPlate, styles.marketPlateLemons)}>
              <EthSymbol>0.05</EthSymbol>
              <div>
                <div className='fs-14 fw-semi fst-italic'>GENESIS NFT</div>
                <div className='fs-20 fw-semi fst-italic'>LIMITED 1111</div>
              </div>
            </div>
          </Link>
          <Link href='/shop/item' className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4">
            <div className={cn('flex-fill d-flex flex-column justify-content-between', styles.marketPlate, styles.marketPlateItems)}>
              <EthSymbol>0.01</EthSymbol>
              <div>
                <div className='fs-14 fw-semi fst-italic'>ITEMS</div>
                <div className='fs-20 fw-semi fst-italic'>LIMITED 7777</div>
              </div>
            </div>
          </Link>
          <Link href='/shop/box' className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4">
            <div className={cn('flex-fill d-flex flex-column justify-content-end', styles.marketPlate, styles.marketPlateChests)}>
              <div>
                <div className='fs-20 fw-semi fst-italic'>PRIZE POOL</div>
                <div className='fs-20 fw-semi fst-italic'>$1.000.000</div>
              </div>
            </div>
          </Link>
          <div className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4">
            <div className={cn('flex-fill d-flex flex-column justify-content-end', styles.marketPlate, styles.marketPlateKeys)}>
              <div>
                <div className='fs-14 fw-semi fst-italic'>KEYS</div>
                <div className='fs-20 fw-semi fst-italic'>FREE MINT FOR</div>
                <div className='fs-20 fw-semi fst-italic'>TESTNET</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};