import { useItems } from "hooks/useItems";
import TabsLayout from "../TabsLayout";
import styles from '../inventory.module.css'
import TokensList from "../TokensList";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { useLemonStore } from "../store/lemon";
import { useOnMount } from "hooks/useOnMount";
import TokensFilter from "../TokensFilter";

interface LemonItemsProps {
  itemHook: ReturnType<typeof useItems>,
}

export default function LemonStart({ itemHook }: PropsWithChildren<LemonItemsProps>) {
  const { selectItem, selectedItem } = useLemonStore()
  const { tokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, itemBalance, isLoading, refreshTokens } = itemHook

  useOnMount(() => {
    refreshTokens();
  })

  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={25} height={350} selectedToken={selectedItem} onClick={selectItem} isLoading={isLoading} />
      <div className="d-flex justify-content-between">
        {isPrevTokens && <button onClick={prevTokens} className="btn btn-sm btn-default m-2">prev</button>}
        {isNextTokens && <button onClick={nextTokens} className={`btn btn-sm btn-default m-2 ${styles.nextBtn}`}>next</button>}
      </div>
      <TokensFilter />
    </TabsLayout>
    {!itemBalance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/lemon" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy lemon in the Shop
        </Link>
      </div>
    </>}
    {!!itemBalance && <div className="row gx-2 ">
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Level up</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Dress</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Undress</button>
      </div>
    </div>}
  </>)
}