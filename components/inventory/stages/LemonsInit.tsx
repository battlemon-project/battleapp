import { useLemons } from "hooks/useLemons";
import TabsLayout from "../TabsLayout";
import styles from '../inventory.module.css'
import TokensList from "../TokensList";
import Link from "next/link";
import { NftMetaData, PropertiesType } from "lemon";
import { PropsWithChildren, useState } from "react";

interface LemonsInit {
  lemonHook: ReturnType<typeof useLemons>
}

export default function LemonsInit({ lemonHook }: PropsWithChildren<LemonsInit>) {
  const [selectedLemon, setSelectedLemon] = useState<NftMetaData>()
  const { tokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, lemonBalance, isLoading } = lemonHook

  const clickToLemon = (token: NftMetaData) => ()  => {
    setSelectedLemon(token);
    //setProperties(token.properties || ghostProperties);
  }

  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={25} height={410} onClick={clickToLemon} isLoading={isLoading} selectedToken={selectedLemon} />
      <div className="d-flex justify-content-between">
        {isPrevTokens && <button onClick={prevTokens} className="btn btn-sm btn-default m-2">prev</button>}
        {isNextTokens && <button onClick={nextTokens} className={`btn btn-sm btn-default m-2 ${styles.nextBtn}`}>next</button>}
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
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Dress</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Undress</button>
      </div>
    </div>}
  </>)
}