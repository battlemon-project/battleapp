import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

interface LemonStartProps {
  balance: number
  contract: string
}

export default function LemonStart({ balance, contract }: LemonStartProps) {
  const { selectedLemons, selectLemon, changeStage } = useLemonStore();

  const { data, mutate, isValidating } = useSWR(
    contract, 
    fetcher({ pageSize: 100 })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={25} height={410} selectedTokens={selectedLemons} onClick={selectLemon} isValidating={isValidating} contract={contract} isNextPage={!!data?.pageKey} withGenerator={true} />
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
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <button className={cn("btn btn-lg btn-default fs-13 text-uppercase w-100", { disabled: !selectedLemons.length })} onClick={() => changeStage('AllItems')}>Inventory</button>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100 disabled">Level up</button>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100 disabled">Dungeon</button>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <Link href="/shop/lemon" className="btn btn-lg btn-default fs-13 text-uppercase w-100">Buy</Link>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <Link target="_blank" href={`https://dew.gg/sell?contract=${contract}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedLemons[0]})}>Sell</Link>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedLemons[0]})} onClick={() => changeStage('Bridge')}>Bridge</button>
        </div>
      </div>
    </div>}
  </>)
}