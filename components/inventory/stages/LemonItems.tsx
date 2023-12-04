import TabsLayout from "../layout/TabsLayout";
import cn from 'classnames'
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import { useEffect, useState } from "react";
import ConfirmEquipment from "../layout/ConfirmEquipment";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

interface LemonItemsProps {
  balance: number
}

export default function LemonItems({ balance }: LemonItemsProps) {
  const [disabledBack, setDisabledBack] = useState(false)
  const { selectItem, selectedItems, changeStage, selectedLemons } = useLemonStore()

  const { data, mutate, isValidating } = useSWR(
    process.env.NEXT_PUBLIC_CONTRACT_ITEMS, 
    fetcher({ pageSize: 100 })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={410} selectedTokens={selectedItems} onClick={selectItem} isValidating={isValidating} contract={process.env.NEXT_PUBLIC_CONTRACT_ITEMS} isNextPage={!!data?.pageKey} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    {!balance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/lemon" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy lemon in the Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-12 col-sm-6 col-lg-5 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: disabledBack })} onClick={() => {changeStage('Start')}}>Back</button>
        </div>
        <div className="col-12 col-sm-6 col-lg-7 mt-2 d-flex">
          <ConfirmEquipment lemon={selectedLemons[0]} items={selectedItems} disabled={!selectedItems?.length} />
        </div>
      </div>
    </div>}
  </>)
}