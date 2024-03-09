import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { usePickaxeStore } from "../store/pickaxeStore";
import { useEffect } from "react";
import useSWR from "swr";
import { simpleFetcher } from "utils/fetcher";
import PickaxeMiningButton from "../buttons/PickaxeMiningButton";
import PickaxeRepairButton from "../buttons/PickaxeRepairButton";
import { useContract } from "hooks/useContract";

interface PickaxeStartProps {
  balance: number,
  chainId: number
}

export default function PickaxeStart({ balance, chainId }: PickaxeStartProps) {
  const NEXT_PUBLIC_CONTRACT_PICKAXES = useContract('PICKAXES')
  const { selectedPickaxe, selectPickaxe } = usePickaxeStore();
  
  const { data, mutate, isValidating } = useSWR(
    NEXT_PUBLIC_CONTRACT_PICKAXES, 
    simpleFetcher({ type: 'pickaxe', pageSize: 100, chainId })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={410} selectedTokens={[selectedPickaxe]} onClick={selectPickaxe} isValidating={isValidating} contract={NEXT_PUBLIC_CONTRACT_PICKAXES} isNextPage={!!data?.pageKey} chainId={chainId} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    {!balance && <>
      <div className="col-12 mt-2">
        <Link href="/shop" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          You can get Pickaxe inside Box from Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <Link target="_blank" href={`https://dew.gg/sell?contract=${NEXT_PUBLIC_CONTRACT_PICKAXES}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')}>Buy & Sell</Link>
        </div>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          {selectedPickaxe && <PickaxeRepairButton pickaxeId={selectedPickaxe.tokenId} pickaxeType={ Number(selectedPickaxe.image.split('/').pop()?.split('.')[0]) } />}
          {!selectedPickaxe && <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>
            Repair
          </button>}
        </div>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <PickaxeMiningButton pickaxeId={selectedPickaxe ? selectedPickaxe.tokenId : -1} />
        </div>
      </div>
    </div>}
  </>)
}