import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { useItemStore } from "../store/itemStore";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";
import { chainUniversalNames } from "utils/misc";

interface ItemStartProps {
  balance: number
  contract: string,
  chainId: number
}

export default function ItemStart({ balance, contract, chainId }: ItemStartProps) {
  const { selectedItems, selectItem, changeStage, stage } = useItemStore();

  const { data, mutate, isValidating } = useSWR(
    contract, 
    fetcher({ type: 'item', pageSize: 100, chainId })
  )

  useEffect(() => {
    if (stage !== 'Start') return;
    mutate();
  }, [stage])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={410} selectedTokens={selectedItems} onClick={selectItem} isValidating={isValidating} contract={contract} isNextPage={!!data?.pageKey} chainId={chainId} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    {!data?.tokens?.length && <>
      <div className="col-12 mt-2">
        <Link href="/game" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy Box in the Shop
        </Link>
      </div>
    </>}
    {!!data?.tokens?.length && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-6 mt-2 d-flex">
          <button className={cn("btn btn-lg btn-default fs-13 text-uppercase w-100 disabled")} onClick={() => changeStage('Gems')}>Level up</button>
          {/* <button className={cn("btn btn-lg btn-default fs-13 text-uppercase w-100", { disabled: !selectedItems.length })} onClick={() => changeStage('Gems')}>Level up</button> */}
        </div>
        <div className="col-6 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedItems[0]})} onClick={() => changeStage('Bridge')}>Bridge</button>
        </div>
        <div className="col-6 mt-2 d-flex">
          <Link href="/game" className="btn btn-lg btn-default fs-13 text-uppercase w-100">Buy Box</Link>
        </div>
        <div className="col-6 mt-2 d-flex">
          <Link target="_blank" href={`https://element.market/assets/${chainUniversalNames[chainId]}/${contract}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedItems[0]})}>Sell</Link>
        </div>
      </div>
    </div>}
  </>)
}