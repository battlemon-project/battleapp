import TabsLayout from "../layout/TabsLayout";
import cn from 'classnames'
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import { useEffect } from "react";
import useSWR from "swr";
import { simpleFetcher } from "utils/fetcher";
import { useAccount } from "wagmi";
import LemonLevelupButton from "../buttons/LemonLevelupButton";

interface LemonGemsProps {
  balance: number
  contract: string
  chainId: number
}

export default function LemonGems({ balance, contract, chainId }: LemonGemsProps) {
  const { address } = useAccount();
  const { selectGem, selectedGems, changeStage, selectedLemons } = useLemonStore()

  const { data, mutate, isValidating } = useSWR(
    contract,
    simpleFetcher({ type: 'gem', pageSize: 100, chainId })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  useEffect(() => {
    mutate();
  }, [])
  
  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={410} selectedTokens={selectedGems} onClick={selectGem} isValidating={isValidating} contract={contract} isNextPage={!!data?.pageKey} chainId={chainId} />
    </TabsLayout>
    <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-6 col-lg-5 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={() => {changeStage('Start')}}>Back</button>
        </div>
        {!!balance && <div className="col-6 col-lg-7 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')} onClick={() => {}}>Level Up</button>
          {/* {(!address || !selectedLemons[0] || !selectedGems[0]) ? <>
            <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')} onClick={() => {}}>Level Up</button>
          </> : <>
            <LemonLevelupButton address={address} lemonId={selectedLemons[0].tokenId} gemId={selectedGems[0].tokenId} chainId={chainId} />
          </>} */}
        </div>}
        {!balance && <div className="col-6 col-lg-7 mt-2 d-flex">
          <Link href="/game" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
            Buy Box
          </Link>
        </div>}
      </div>
    </div>
  </>)
}