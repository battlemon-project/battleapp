import { useLemons } from "hooks/useLemons";
import TabsLayout from "../layout/TabsLayout";
import styles from '../inventory.module.css'
import TokensList from "../layout/TokensList";
import cn from 'classnames';
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import { useOnMount } from "hooks/useOnMount";
import NextTokens from "../layout/NextTokens";
import PrevTokens from "../layout/PrevTokens";

export default function LemonStart() {
  const { selectedLemons, selectLemon, changeStage } = useLemonStore()
  const { tokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, lemonBalance, isLoading, refreshTokens } = useLemons()

  useOnMount(() => {
    refreshTokens();
  })

  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={25} height={410} selectedTokens={selectedLemons} onClick={selectLemon} isLoading={isLoading} />
      <div className="position-relative">
        {isPrevTokens && <PrevTokens onClick={prevTokens} />}
        {isNextTokens && <NextTokens onClick={nextTokens} />}
      </div>
    </TabsLayout>
    {!lemonBalance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/lemon" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy lemon in the Shop
        </Link>
      </div>
    </>}
    {!!lemonBalance && <div className="row gx-2 ">
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