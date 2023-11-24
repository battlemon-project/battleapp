import styles from './inventory.module.css';
import cn from "classnames";
import { useItemsContext } from './ItemsContext';
import Items from './TokensList/Items';

export default function ItemsTab() {
  const { itemBalance, selectedItem } = useItemsContext()

  return (<div className="row">
    <div className="col-5">
      {!itemBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/items-gallery.gif" />}
      {!!itemBalance && <div className="position-relative p-5">
        <img src={selectedItem?.image || '/images/hub/choose-item.png'} className="img-fluid pr-5" />
      </div>}
    </div>
    <div className={cn('col-7', styles.inventoryContainer)}>
      <Items />
    </div>
  </div>)
}