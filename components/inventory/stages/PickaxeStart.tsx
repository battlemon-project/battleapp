import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { usePickaxeStore } from "../store/pickaxeStore";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

interface PickaxeStartProps {
  balance: number
}

export default function PickaxeStart({ balance }: PickaxeStartProps) {
  const { selectedPickaxe, selectPickaxe } = usePickaxeStore();

  const { data, mutate, isValidating } = useSWR(
    process.env.NEXT_PUBLIC_CONTRACT_PICKAXES, 
    fetcher({ pageSize: 100 })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={410} selectedTokens={[selectedPickaxe]} onClick={selectPickaxe} isValidating={isValidating} contract={process.env.NEXT_PUBLIC_CONTRACT_PICKAXES} isNextPage={!!data?.pageKey} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    {!balance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/box" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          You can get Pickaxe inside Box from Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <Link target="_blank" href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_PICKAXES}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')}>Buy & Sell</Link>
        </div>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100 disabled">Repair</button>
        </div>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100 disabled">Start Mining</button>
        </div>
      </div>
    </div>}
  </>)
}