import cn from 'classnames';
import styles from './shop.module.css'
import Link from 'next/link';
import PolSymbol from 'components/layout/PolSymbol';

export default function ShopPage() {
  return (
    <div className="container py-3">
      <div className={`p-4 rounded-5 ${styles.marketBg}`}>
        <div className={cn('d-flex mb-4', styles.marketBtnsRow)}>
          <div className="col-6 d-flex">
            <button className={cn(styles.marketBtn, { [styles.active]: 1 })}>LAUNCHPAD</button>
          </div>
          <div className="col-6 d-flex opacity-25">
            <button className={cn(styles.marketBtn)}>MARKETPLACE <sup className='fs-11'>COMING SOON</sup></button>
          </div>
        </div>
        <img className="position-relative rounded-4 img-fluid w-100" src="/images/shop/marketplace-frame.png" />

        <div className="row mt-4">
          <Link href='/shop/lemon' className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4">
            <div className={cn('flex-fill d-flex flex-column justify-content-between', styles.marketPlate, styles.marketPlateLemons)}>
              <span className='fs-14'><PolSymbol>{process.env.NEXT_PUBLIC_MINT_LEMONS_PRICE} MATIC</PolSymbol></span>
              <div>
                <div className='fs-14 fw-semi fst-italic'>GENESIS NFT</div>
                <div className='fs-20 fw-semi fst-italic'>LIMITED 1111</div>
              </div>
            </div>
          </Link>
          <Link href='/shop/item' className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4">
            <div className={cn('flex-fill d-flex flex-column justify-content-between', styles.marketPlate, styles.marketPlateItems)}>
              <span className='fs-14'><PolSymbol>{process.env.NEXT_PUBLIC_MINT_ITEMS_PRICE} MATIC</PolSymbol></span>
              <div>
                <div className='fs-14 fw-semi fst-italic'>ITEMS</div>
                <div className='fs-20 fw-semi fst-italic'>LIMITED 7777</div>
              </div>
            </div>
          </Link>
          <div className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4 opacity-25">
            <div className={cn('flex-fill d-flex flex-column justify-content-end', styles.marketPlate, styles.marketPlateChests)}>
              <div>
                <div className='fs-14 fw-semi fst-italic'>COMING SOON</div>
                <div className='fs-20 fw-semi fst-italic'>PRIZE POOL</div>
                <div className='fs-20 fw-semi fst-italic'>$1.000.000</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3 col-lg-4 d-flex mb-4 opacity-25">
            <div className={cn('flex-fill d-flex flex-column justify-content-end', styles.marketPlate, styles.marketPlateKeys)}>
              <div>
                <div className='fs-14 fw-semi fst-italic'>COMING SOON</div>
                <div className='fs-20 fw-semi fst-italic'>WORLD</div>
                <div className='fs-20 fw-semi fst-italic'>ACCESS KEYS</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};