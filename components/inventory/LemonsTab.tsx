import { useLemons } from "hooks/useLemons";
import TabsLayout from "./TabsLayout";
import styles from './inventory.module.css'
import TokensList from "./TokensList";
import cn from "classnames";
import Link from "next/link";
import { NftMetaData, PropertiesType } from "lemon";
import { useState } from "react";
import LemonScene from "components/babylon/LemonScene";
import { getRandomProperties, ghostProperties } from "utils/properties";

export default function LemonTab() {
  const [properties, setProperties] = useState<PropertiesType>(ghostProperties)
  const [selectedLemon, setSelectedLemon] = useState<NftMetaData>()
  const [isModelLoading, setIsModelLoading ] = useState<boolean>(true)
  const { tokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, lemonBalance, isLoading } = useLemons()

  const clickToLemon = (token: NftMetaData) => ()  => {
    setSelectedLemon(token)
    setProperties(getRandomProperties())
  }


  return (<div className="row">
    <div className="col-5">
      {!lemonBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/lemons-gallery.gif" />}
      {!!lemonBalance && <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.generatorContainer}>
          { isModelLoading && <div className="spinner-border text-light mx-auto position-absolute" style={{left: '50%', top: '48%', width: '3rem', height: '3rem'}} />}
          <LemonScene properties={properties} onModelReady={() => setIsModelLoading(false)} />
        </div>
      </div>}
    </div>
    <div className={cn('col-7', styles.inventoryContainer)}>
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
    </div>
  </div>)
}