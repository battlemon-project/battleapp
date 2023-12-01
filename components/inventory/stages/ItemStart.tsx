import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import Link from "next/link";
import { useItemStore } from "../store/itemStore";
import TokensFilter from "../layout/TokensFilter";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

interface ItemStartProps {
  balance: number
}

export default function ItemStart({ balance }: ItemStartProps) {
  const { selectedItems, selectItem, changeStage } = useItemStore();

  const { data, mutate, isValidating } = useSWR(
    process.env.NEXT_PUBLIC_CONTRACT_ITEMS, 
    fetcher({ pageSize: 100 })
  )

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={350} selectedTokens={selectedItems} onClick={selectItem} isValidating={isValidating} contract={process.env.NEXT_PUBLIC_CONTRACT_ITEMS} isNextPage={!!data?.pageKey} />
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