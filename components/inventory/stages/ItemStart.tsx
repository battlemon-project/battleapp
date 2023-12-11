import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { useItemStore } from "../store/itemStore";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

interface ItemStartProps {
  balance: number
}

export default function ItemStart({ balance }: ItemStartProps) {
  const { selectedItems, selectItem } = useItemStore();

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
        <Link href="/shop/item" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy item in the Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-6 col-lg-3 mt-2 d-flex">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100 disabled">Level up</button>
        </div>
        <div className="col-6 col-lg-3 mt-2 d-flex">
          <Link href="/shop/item" className="btn btn-lg btn-default fs-13 text-uppercase w-100">Buy</Link>
        </div>
        <div className="col-6 col-lg-3 mt-2 d-flex">
          <Link target="_blank" href={`${process.env.NEXT_PUBLIC_OPENSEA_URL}/${process.env.NEXT_PUBLIC_CONTRACT_ITEMS}/${selectedItems[0]?.tokenId}/sell`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedItems[0]})}>Sell</Link>
        </div>
        <div className="col-6 col-lg-3 mt-2 d-flex">
          <Link target="_blank" href={`${process.env.NEXT_PUBLIC_OPENSEA_URL}/${process.env.NEXT_PUBLIC_CONTRACT_ITEMS}/${selectedItems[0]?.tokenId}/transfer`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedItems[0]})}>Send</Link>
        </div>
      </div>
    </div>}
  </>)
}