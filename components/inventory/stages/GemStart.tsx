import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { useGemStore } from "../store/gemStore";
import { useEffect } from "react";
import useSWR from "swr";
import { simpleFetcher } from "utils/fetcher";
import GemMergeButton from "../buttons/GemMergeButton";

interface GemStartProps {
  balance: number
}

export default function GemStart({ balance }: GemStartProps) {
  const { selectedGems, selectGem } = useGemStore();

  const { data, mutate, isValidating } = useSWR(
    process.env.NEXT_PUBLIC_CONTRACT_GEMS, 
    simpleFetcher({ pageSize: 100 })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={410} selectedTokens={selectedGems} onClick={selectGem} isValidating={isValidating} contract={process.env.NEXT_PUBLIC_CONTRACT_GEMS} isNextPage={!!data?.pageKey} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    {!balance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/box" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          You can get Gem inside Box from Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <Link target="_blank" href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_GEMS}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')}>Buy & Sell</Link>
        </div>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          {selectedGems.length >= 2 && <GemMergeButton selectedGems={selectedGems} />}
          {selectedGems.length < 2 && <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>
            Merge
          </button>}
        </div>
      </div>
    </div>}
  </>)
}