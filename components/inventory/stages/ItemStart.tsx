import TabsLayout from "../layout/TabsLayout";
import styles from '../inventory.module.css'
import TokensList from "../layout/TokensList";
import Link from "next/link";
import { useItemStore } from "../store/itemStore";
import TokensFilter from "../layout/TokensFilter";
import NextTokens from "../layout/NextTokens";
import PrevTokens from "../layout/PrevTokens";
import { useFetcher } from "hooks/useFetcher";
import { useEffect } from "react";

interface ItemStartProps {
  balance: number
}

export default function ItemStart({ balance }: ItemStartProps) {
  const { selectedItems, selectItem, changeStage } = useItemStore();
  const { data: tokens, mutate: refreshTokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, isValidating } = useFetcher({ 
    contract: process.env.NEXT_PUBLIC_CONTRACT_ITEMS as '0x',
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
        <Link href="/shop/item" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy item in the Shop
        </Link>
      </div>
    </>}
    {!!balance && <div className="row gx-2 ">
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100" onClick={() => changeStage('Gems')}>Level up</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Sell</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Undress</button>
      </div>
    </div>}
  </>)
}