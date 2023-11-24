import styles from '../inventory.module.css'
import Link from "next/link";
import TabsLayout from "./TabsLayout";
import TokensList from "./TokensList";
import { useItemsContext } from '../ItemsContext';
import TokensFilter from './TokensFilter';

export default function Items() {
  const { 
    tokens, 
    nextTokens, 
    isNextTokens, 
    prevTokens, 
    isPrevTokens, 
    itemBalance, 
    isLoading,
    clickToItem,
    selectedItem
  } = useItemsContext()

  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={25} height={350} onClick={clickToItem} isLoading={isLoading} selectedToken={selectedItem} />
      <div className="d-flex justify-content-between">
        {isPrevTokens && <button onClick={prevTokens} className="btn btn-sm btn-default m-2">prev</button>}
        {isNextTokens && <button onClick={nextTokens} className={`btn btn-sm btn-default m-2 ${styles.nextBtn}`}>next</button>}
      </div>
      <TokensFilter />
    </TabsLayout>
    {!itemBalance && <>
      <div className="col-12 mt-2">
        <Link href="/shop/item" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy item in the Shop
        </Link>
      </div>
    </>}
    {!!itemBalance && <div className="row gx-2">
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Level up</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Sell</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Send</button>
      </div>
    </div>}  
  </>)
}