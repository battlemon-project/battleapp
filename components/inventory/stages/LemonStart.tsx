import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import cn from 'classnames';
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

interface LemonStartProps {
  balance: number
}

export default function LemonStart({ balance }: LemonStartProps) {
  const { selectedLemons, selectLemon, changeStage } = useLemonStore()

  const { data, mutate, isValidating } = useSWR(
    process.env.NEXT_PUBLIC_CONTRACT_LEMONS, 
    fetcher({ pageSize: 100 })
  )

  const loadMore = async () => {
    const nextData = await fetcher({ pageSize: 100, pageKey: data?.pageKey })(process.env.NEXT_PUBLIC_CONTRACT_LEMONS!)
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
      <TokensList tokens={data?.tokens} colWidth={25} height={410} selectedTokens={selectedLemons} onClick={selectLemon} isValidating={isValidating} loadMore={data?.pageKey ? loadMore : undefined} />
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