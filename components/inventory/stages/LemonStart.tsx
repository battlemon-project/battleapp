import TabsLayout from "../layout/TabsLayout";
import styles from '../inventory.module.css'
import TokensList from "../layout/TokensList";
import cn from 'classnames';
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import NextTokens from "../layout/NextTokens";
import PrevTokens from "../layout/PrevTokens";
import { useFetcher } from "hooks/useFetcher";
import { useEffect } from "react";

interface LemonStartProps {
  balance: number
}

export default function LemonStart({ balance }: LemonStartProps) {
  const { selectedLemons, selectLemon, changeStage } = useLemonStore()
  const { data: tokens, mutate: refreshTokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, isValidating } = useFetcher({ 
    contract: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    pageSize: 100
  })

  useEffect(() => {
    if (!balance) return
    refreshTokens();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={25} height={410} selectedTokens={selectedLemons} onClick={selectLemon} isValidating={isValidating} />
      <div className="position-relative">
        {isPrevTokens && <PrevTokens onClick={prevTokens} />}
        {isNextTokens && <NextTokens onClick={nextTokens} />}
      </div>
    </TabsLayout>
    {!balance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/lemon" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy lemon in the Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className="row gx-2 ">
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Level up</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className={cn("btn btn-lg btn-default fs-13 text-uppercase w-100", { disabled: !selectedLemons.length })} onClick={() => changeStage('Items')}>Dress</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Undress</button>
      </div>
    </div>}
  </>)
}