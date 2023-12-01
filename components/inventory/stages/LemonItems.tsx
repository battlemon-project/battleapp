import TabsLayout from "../layout/TabsLayout";
import cn from 'classnames'
import TokensList from "../layout/TokensList";
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import TokensFilter from "../layout/TokensFilter";
import { useEffect, useState } from "react";
import ConfirmEquipment from "../layout/ConfirmEquipment";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

interface LemonItemsProps {
  balance: number
}

export default function LemonItems({ balance }: LemonItemsProps) {
  const [disabledBack, setDisabledBack] = useState(false)
  const { selectItem, selectedItems, changeStage, selectedLemons } = useLemonStore()

  const { data, mutate, isValidating } = useSWR(
    process.env.NEXT_PUBLIC_CONTRACT_ITEMS, 
    fetcher({ pageSize: 100 })
  )

  const loadMore = async () => {
    const nextData = await fetcher({ pageSize: 100, pageKey: data?.pageKey })(process.env.NEXT_PUBLIC_CONTRACT_ITEMS!)
    mutate({
      tokens: [
        ...(data?.tokens || []),
        ...(nextData?.tokens || [])
      ],
      pageKey: nextData?.pageKey
    }, {
      revalidate: false
    })
  }

  useEffect(() => {
    if (!balance) return
    mutate();
  }, [balance])

  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={20} height={350} selectedTokens={selectedItems} onClick={selectItem} isValidating={isValidating} loadMore={data?.pageKey ? loadMore : undefined} />
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