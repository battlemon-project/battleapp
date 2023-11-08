import classNames from 'classnames';
import styles from './shop.module.css'

export default function ShopPage() {
  return (
    <div className="container py-3">
      <div className={`p-4 rounded-5 ${styles.marketBg}`}>
        <div className={classNames('d-flex mb-4', styles.marketBtnsRow)}>
          <div className="col-6">
            <button className={classNames(styles.marketBtn)}>MARKETPLACE</button>
          </div>
          <div className="col-6">
            <button className={classNames(styles.marketBtn, { [styles.active]: 1 })}>LAUNCHPAD</button>
          </div>
        </div>
        <img className="position-relative rounded-4 img-fluid w-100" src="/images/shop/marketplace-frame.png" />

        <div className="row mt-4">
          <div className="col-3 d-flex">
            <div className={classNames('flex-fill', styles.marketPlate, styles.marketPlateLemons)}>
            </div>
          </div>
          <div className="col-3 d-flex">
            <div className={classNames('flex-fill', styles.marketPlate, styles.marketPlateItems)}>
            </div>
          </div>
          <div className="col-3 d-flex">
            <div className={classNames('flex-fill', styles.marketPlate, styles.marketPlateChests)}>
            </div>
          </div>
          <div className="col-3 d-flex">
            <div className={classNames('flex-fill', styles.marketPlate, styles.marketPlateKeys)}>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};