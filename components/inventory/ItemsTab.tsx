import styles from './inventory.module.css'
import cn from "classnames";
import { useItemStore } from './store/itemStore';
import ItemStart from './stages/ItemStart';
import { useItemBalance } from 'hooks/useItemBalance';

export default function ItemsTab() {
  const { selectedItems, stage } = useItemStore()
  const { balance } = useItemBalance()

  return (<div className="row">
    <div className="col-lg-5 d-none d-lg-block">
      {!balance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/items-gallery.gif" />}
      {!!balance && <div className="position-relative p-5">
        <img src={selectedItems[0]?.image || '/images/hub/choose-item.png'} className="img-fluid pr-5" />
      </div>}
    </div>
    <div className={cn('col-lg-7 col-12', styles.inventoryContainer)}>
      {stage == 'Start' && <ItemStart balance={balance} />}
    </div>
  </div>)
}