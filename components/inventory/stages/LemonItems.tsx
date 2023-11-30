import TabsLayout from "../layout/TabsLayout";
import cn from 'classnames'
import TokensList from "../layout/TokensList";
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import TokensFilter from "../layout/TokensFilter";
import NextTokens from "../layout/NextTokens";
import PrevTokens from "../layout/PrevTokens";
import { useFetcher } from "hooks/useFetcher";
import { useEffect, useState } from "react";
import ConfirmEquipment from "../layout/ConfirmEquipment";

interface LemonItemsProps {
  balance: number
}

export default function LemonItems({ balance }: LemonItemsProps) {
  const [disabledBack, setDisabledBack] = useState(false)
  const { selectItem, selectedItems, changeStage, selectedLemons } = useLemonStore()
  const { data: tokens, mutate: refreshTokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, isValidating } = useFetcher({ 
    contract: process.env.NEXT_PUBLIC_ITEMS_CONTRACT as '0x',
    pageSize: 100
  })

  useEffect(() => {
    if (!balance) return
    refreshTokens();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={20} height={350} selectedTokens={selectedItems} onClick={selectItem} isValidating={isValidating} />
      <div className="position-relative">
        {isPrevTokens && <PrevTokens onClick={prevTokens} />}
        {isNextTokens && <NextTokens onClick={nextTokens} />}
      </div>
      <TokensFilter />
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
        <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: disabledBack })} onClick={() => {changeStage('Start')}}>Back</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100 disabled">Dress</button>
      </div>
      <ConfirmEquipment lemon={selectedLemons[0]} items={selectedItems} setDisabledBack={setDisabledBack} />
    </div>}
  </>)
}