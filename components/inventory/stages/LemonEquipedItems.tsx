import cn from 'classnames'
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import { useLemonStore } from "../store/lemonStore";
import UndressEquipment from "../layout/UndressEquipment";
import TabsLemonItems from "../layout/TabsLemonItems";
import { NftMetaData } from 'lemon';
import { dressedItemsToNftMetaData } from 'utils/properties';

interface LemonAllItemsProps {
}

export default function LemonAllItems({}: LemonAllItemsProps) {
  const { selectItem, selectedItems, changeStage, selectedLemons } = useLemonStore()

  const tokens = dressedItemsToNftMetaData(selectedLemons[0].properties.itemsData)

  return (<>
    <TabsLemonItems>
      <TokensList tokens={tokens} colWidth={20} height={410} selectedTokens={selectedItems} onClick={selectItem} isValidating={false} />
    </TabsLemonItems>
    <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-12 col-sm-6 col-lg-5 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={() => {changeStage('Start')}}>Back</button>
        </div>
        <div className="col-12 col-sm-6 col-lg-7 mt-2 d-flex">
          <UndressEquipment lemon={selectedLemons[0]} items={selectedItems} disabled={true || (selectedItems || [])?.length == Object.keys(selectedLemons[0].properties.itemsData || {}).length} />
        </div>
      </div>
    </div>
  </>)
}