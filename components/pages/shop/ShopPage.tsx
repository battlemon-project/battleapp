import classNames from 'classnames';
import styles from './shop.module.css'

export default function ShopPage() {
  return (
    <div className="container py-3">
      <div className={`p-4 rounded-5 ${styles.marketplaceBg}`}>
        <div className={classNames('d-flex mb-4', styles.marketplaceBtnsRow)}>
          <div className="col-6">
            <button className={classNames(styles.marketplaceBtn)}>MARKETPLACE</button>
          </div>
          <div className="col-6">
            <button className={classNames(styles.marketplaceBtn, { [styles.active]: 1 })}>LAUNCHPAD</button>
          </div>
        </div>
        <img className="position-relative rounded-4 img-fluid w-100" src="/images/marketplace-frame.png" />
      </div>
    </div>
  );
};