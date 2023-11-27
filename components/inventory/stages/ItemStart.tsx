import { useItems } from "hooks/useItems";
import TabsLayout from "../TabsLayout";
import styles from '../inventory.module.css'
import TokensList from "../TokensList";
import Link from "next/link";
import { useItemStore } from "../store/itemStore";
import { useOnMount } from "hooks/useOnMount";

export default function ItemStart() {
  const { selectedItem, selectItem, changeStage } = useItemStore()
  const { tokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, itemBalance, isLoading, refreshTokens } = useItems()

  useOnMount(() => {
    refreshTokens();
  })

  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={25} height={410} selectedToken={selectedItem} onClick={selectItem} isLoading={isLoading} />
      <div className="d-flex justify-content-between">
        {isPrevTokens && <button onClick={prevTokens} className="btn btn-sm btn-default m-2">prev</button>}
        {isNextTokens && <button onClick={nextTokens} className={`btn btn-sm btn-default m-2 ${styles.nextBtn}`}>next</button>}
      </div>
    </TabsLayout>
    {!itemBalance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/item" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy item in the Shop
        </Link>
      </div>
    </>}
    {!!itemBalance && <div className="row gx-2 ">
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