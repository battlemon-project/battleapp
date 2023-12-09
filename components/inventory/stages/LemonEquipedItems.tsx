import cn from 'classnames'
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import { useLemonStore } from "../store/lemonStore";
import UndressEquipment from "../layout/UndressEquipment";
import TabsLemonItems from "../layout/TabsLemonItems";
import { NftMetaData } from 'lemon';
import { dressedItemsToNftMetaData } from 'utils/properties';
import { useEffect, useState } from 'react';
import { getFromStorage } from 'utils/fetcher';

interface LemonAllItemsProps {
}

export default function LemonAllItems({}: LemonAllItemsProps) {
  const [ refresh, refreshItems ] = useState<number>()
  const [ tokens, setTokens ] = useState<NftMetaData[] | undefined>()
  const { selectItem, selectedItems, changeStage, selectedLemons, updateStore } = useLemonStore()

  useEffect(() => {
    getFromStorage({ 
      contract: process.env.NEXT_PUBLIC_CONTRACT_LEMONS!, 
      tokenId: selectedLemons[0].tokenId 
    }).then(data => {
      const _tokens = dressedItemsToNftMetaData(data.properties.itemsData);
      setTokens(_tokens);
      updateStore({
        selectedItems: _tokens
      })
    })
  }, [refresh])

  return (<>
    <TabsLemonItems>
      <TokensList tokens={tokens} colWidth={20} height={410} selectedTokens={selectedItems} onClick={selectItem} isValidating={tokens == undefined} />
    </TabsLemonItems>
    <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-12 col-sm-6 col-lg-5 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={() => {changeStage('Start')}}>Back</button>
        </div>
        <div className="col-12 col-sm-6 col-lg-7 mt-2 d-flex">
          <UndressEquipment lemon={selectedLemons[0]} items={selectedItems} disabled={(selectedItems?.filter(i => i !== undefined) || []).length == (tokens || []).length} refreshItems={refreshItems} />
        </div>
      </div>
    </div>
  </>)
}