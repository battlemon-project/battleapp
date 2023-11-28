import { useItems } from 'hooks/useItems';
import styles from './inventory.module.css'
import cn from "classnames";
import { useItemStore } from './store/itemStore';
import ItemStart from './stages/ItemStart';

export default function ItemsTab() {
  const { selectedItems, stage } = useItemStore()
  const { itemBalance } = useItems()

  return (<div className="row">
    <div className="col-5">
      {!itemBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/items-gallery.gif" />}
      {!!itemBalance && <div className="position-relative p-5">
        <img src={selectedItems[0]?.image || '/images/hub/choose-item.png'} className="img-fluid pr-5" />
      </div>}
    </div>
    <div className={cn('col-7', styles.inventoryContainer)}>
      {stage == 'Start' && <ItemStart />}
    </div>
  </div>)
}