import { useLemons } from "hooks/useLemons";
import TabsLayout from "./TabsLayout";
import styles from './inventory.module.css'
import TokensList from "./TokensList";
import cn from "classnames";
import Link from "next/link";
import { NftMetaData, PropertiesType } from "lemon";
import { useState } from "react";
import LemonScene from "components/babylon/LemonScene";
import { getRandomTraits } from "utils/properties";

const defaultTraits: PropertiesType = {
  eyes: 'Eyes_Ghost',
  exo_top: 'ExoTop_Ghost',
  exo_bot: 'ExoBot_Ghost',
  feet: 'Feet_Ghost',
  hands: 'Hands_Ghost',
  head: 'Head_Ghost',
}

export default function LemonTab() {
  const [traits, setTraits] = useState<PropertiesType>(defaultTraits)
  const [items, setItems] = useState<PropertiesType>({})
  const { tokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, lemonBalance } = useLemons()

  const clickToLemon = (token: NftMetaData) => ()  => {
    setTraits(getRandomTraits())
  }


  return (<div className="row">
    <div className="col-5">
      {!lemonBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/lemons-gallery.gif" />}
      {!!lemonBalance && <div className="position-relative">
        <img src="/images/pixel.png" width='1000' className="img-fluid" />
        <div className={styles.generatorContainer}>
          <LemonScene traits={traits} items={items} />
        </div>
      </div>}
    </div>
    <div className={cn('col-7', styles.inventoryContainer)}>
      <TabsLayout>
        <TokensList tokens={tokens} colWidth={25} height={410} onClick={clickToLemon} />
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
    </div>
  </div>)
}