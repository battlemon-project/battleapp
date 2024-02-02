import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { useStickerStore } from "../store/stickerStore";
import { useEffect } from "react";
import useSWR from "swr";
import { simpleFetcher } from "utils/fetcher";
import StickerMergeButton from "../buttons/StickerMergeButton";

interface StickerStartProps {
  balance: number
}

export default function StickerStart({ balance }: StickerStartProps) {
  const { selectedStickers, selectSticker, mergeStatus } = useStickerStore();

  const { data, mutate, isValidating } = useSWR(
    process.env.NEXT_PUBLIC_CONTRACT_STICKERS, 
    simpleFetcher({ pageSize: 100 })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])
  
  useEffect(() => {
    if (mergeStatus !== 'success' && mergeStatus !== 'error') return
    mutate();
  }, [mergeStatus])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={410} selectedTokens={selectedStickers} onClick={selectSticker} isValidating={isValidating} contract={process.env.NEXT_PUBLIC_CONTRACT_STICKERS} isNextPage={!!data?.pageKey} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    {!balance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/box" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          You can get Sticker inside Box from Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <Link target="_blank" href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_STICKERS}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')}>Buy & Sell</Link>
        </div>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          {selectedStickers.length >= 4 && <StickerMergeButton selectedStickers={selectedStickers} />}
          {selectedStickers.length < 4 && <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>
            Merge
          </button>}
        </div>
      </div>
    </div>}
  </>)
}