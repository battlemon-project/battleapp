import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { useGemStore } from "../store/gemStore";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { simpleFetcher } from "utils/fetcher";
import GemMergeButton from "../buttons/GemMergeButton";
import { NftMetaData } from "lemon";
import { useGemRank } from "hooks/useGemRank";
import { useContract } from "hooks/useContract";

interface GemStartProps {
  balance: number
  chainId: number
}

export default function GemStart({ balance, chainId }: GemStartProps) {
  const NEXT_PUBLIC_CONTRACT_GEMS = useContract('GEMS')
  const { selectedGems, selectGem, mergeStatus } = useGemStore();
  const { getGemRank } = useGemRank();
  const [ tokensWithRank, setTokensWithRank ] = useState<NftMetaData[]>([])

  const { data, mutate, isValidating } = useSWR(
    NEXT_PUBLIC_CONTRACT_GEMS, 
    simpleFetcher({ type: 'gem', pageSize: 100, chainId })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  useEffect(() => {
    if (mergeStatus !== 'success' && mergeStatus !== 'error') return
    mutate();
  }, [mergeStatus])


  async function setRanksToGems(tokens: NftMetaData[]) {
    await Promise.all(tokens.map(async(token) => {
      const rank = await getGemRank(token.tokenId)
      token.image = `https://storage.battlemon.com/v1/gems/${rank + 1}.png`;
    })).catch(err => {
      console.log('gem is burned')
      //throw new Error(err);
    });
    setTokensWithRank(tokens)
  }

  useEffect(() => {
    if (!data?.tokens?.length) return
    setRanksToGems(data.tokens)
  }, [data])

  return (<>
    <TabsLayout>
      <TokensList tokens={tokensWithRank} colWidth={20} height={410} selectedTokens={selectedGems} onClick={selectGem} isValidating={isValidating} contract={NEXT_PUBLIC_CONTRACT_GEMS} isNextPage={!!data?.pageKey} chainId={chainId} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    {!balance && <>
      <div className="col-12 mt-2">
        <Link href="/shop" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy Box in the Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-4 col-lg-4 mt-2 d-flex">
          <Link target="_blank" href={`https://dew.gg/sell?contract=${NEXT_PUBLIC_CONTRACT_GEMS}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')}>Buy & Sell</Link>
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